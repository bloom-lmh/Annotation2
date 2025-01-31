import { TextDocument } from "vscode"
import { ClassMember, EnumMember, InterfaceMember, MethodMember, PropertyMember, TypedefMember } from "../member/member"
import { MemberHandleStrategy } from "./memberHandleStrategy"
import { MemberDeclaration } from "../ast/astHelper"
import { ErrorNotifier, MemberType } from "../error/errorrNotifier"
import { Member } from "../parser/member"
import { MethodType } from "./memberType"

/**
 * @name RegExpMemberHandleStrategy
 * @class
 * @implements {MemberHandleStrategy}
 * @description 正则处理策略
 */
export class RegExpMemberHandleStrategy implements MemberHandleStrategy {
  private document: TextDocument
  private textMemberDeclaration: string = ""
  constructor(document: TextDocument) {
    this.document = document
  }
  handleClass(memberDeclaration: MemberDeclaration): Member | null {
    // 获取字符串成员文本和成员声明开始行
    let { textMemberDeclaration, startLineNumber } = this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配类的基本信息：是否是 abstract 类、类名、继承类和实现接口
    const regex = /(?<_abstract>abstract)?\s*class\s+(?<_name>\w+)\s*(?:extends\s+(?<_extend>\w+))?\s*(?:implements\s+(?<_implements>[A-Za-z, ]+))?/;
    // 匹配类声明
    const match = textMemberDeclaration.match(regex);
    // 不匹配返回默认成员
    if (!match || !match.groups) {
      ErrorNotifier.showMemberParseError(MemberType.CLASS, startLineNumber)
      return new ClassMember()
    }
    // 解构获取类的相关信息
    const { _abstract, _name, _extends, _implements } = match.groups;

    // 返回封装的 ClassMember 实例
    return new ClassMember()
      .setName(_name)
      .setAbstract(!!_abstract)
      .setExtends(_extends)
      .setImplements(_implements ? _implements.split(',').map(item => item.trim()) : [])
  }
  handleMethod(memberDeclaration: MemberDeclaration): Member | null {
    let { textMemberDeclaration, startLineNumber } = this.preHandle(memberDeclaration)
    // 改进后的正则表达式
    const regex = /(?<_access>public|private|protected)?\s*(?<_static>static)?\s*(?<_async>async)?\s*(?<_name>\w+)\s*\((?<_params>.*?)\)\s*(?::\s*(?<_returnType>\w+))?(?:\s*throws\s*(?<_throws>[\w, ]+))?/;
    // 匹配
    const match = textMemberDeclaration.match(regex);
    // 不匹配返回默认成员
    if (!match || !match.groups) {
      ErrorNotifier.showMemberParseError(MemberType.METHOD, startLineNumber)
      return new ClassMember()
    }
    const { _access, _static, _async, _name, _params, _returnType, _throws } = match.groups;

    // 返回方法成员 
    return new MethodMember()
      .setName(_name)
      .setAsync(!!_async)
      .setMethod(_name === "constructor" ? MethodType.CONSTRUCTOR : MethodType.FUNCTION)
      .setThrows(this.parseThrownErrors(textMemberDeclaration))
      .setParams(this.parseParams(_params || ''))
      .setReturnType(_returnType)
      .setStatic(!!_static)
      .setAccess(_access)
  }
  handleProperty(memberDeclaration: MemberDeclaration): Member | null {
    let { textMemberDeclaration, startLineNumber } = this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配属性的声明信息（包括默认值）
    const regex = /(?<_access>public|private|protected)?\s*(?<_static>static)?\s*(?<_name>\w+)\s*:\s*(?<_type>\w+)\s*(?<_defaultValue>=\s*[^;]+)?/;
    // 首先尝试解析箭头函数
    let methodMember = this.parseArrowFunction(textMemberDeclaration)
    if (methodMember) return methodMember
    // 匹配属性声明
    const match = textMemberDeclaration.match(regex);
    if (!match || !match.groups) {
      ErrorNotifier.showMemberParseError(MemberType.METHOD, startLineNumber)
      return new PropertyMember()
    }
    // 解构提取属性信息
    const { _access, _static, _name, _type, _defaultValue } = match.groups;

    // 返回封装的 PropertyMember 实例
    return new PropertyMember()
      .setName(_name)
      .setType(_type)
      .setStatic(!!_static)
      .setDefault(_defaultValue ? _defaultValue.trim().slice(1).trim() : '')
      .setAccess(_access)
  }

  handleInterface(memberDeclaration: MemberDeclaration): Member | null {
    let { textMemberDeclaration, startLineNumber } = this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配接口声明
    const regex = /interface\s+(?<name>\w+)\s*(?:extends\s+(?<extends>\w+(?:,\s*\w+)*))?/;

    // 匹配接口声明
    const match = textMemberDeclaration.match(regex);
    if (!match || !match.groups) {
      ErrorNotifier.showMemberParseError(MemberType.INTERFACE, startLineNumber)
      return new InterfaceMember()
    }
    // 解构提取接口信息
    const { name: _name, extends: _extends } = match.groups;
    // 返回封装的 InterfaceMember 实例
    return new InterfaceMember()
      .setName(_name)
      .setInterface(true)
      .setExtends(_extends ? _extends.split(',').map(item => item.trim()) : [])
  }

  handleEnum(memberDeclaration: MemberDeclaration): Member | null {
    let { textMemberDeclaration, startLineNumber } = this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配枚举声明
    const regex = /enum\s+(?<name>\w+)\s*{(?<members>[^}]+)}/;
    // 匹配枚举声明
    const match = textMemberDeclaration.match(regex);
    if (!match || !match.groups) {
      ErrorNotifier.showMemberParseError(MemberType.INTERFACE, startLineNumber)
      return new InterfaceMember()
    }
    // 解构提取枚举信息
    const { name: _name, members } = match.groups;
    // 获取枚举成员（处理成员中的默认值）
    const _members = members.split(',').map(member => {
      const [memberName, value] = member.split('=').map(item => item.trim());
      return {
        name: memberName,
        value: value ? value.trim() : undefined  // 如果有显式值则返回值，否则为 undefined
      };
    });
    // 返回封装的 EnumMember 实例
    return new EnumMember()
      .setName(_name)
      .setEnum(true)
      .setEnumMembers(_members)
  }

  handleTypedef(memberDeclaration: MemberDeclaration): Member | null {
    let { textMemberDeclaration, startLineNumber } = this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配类型别名（typedef）
    const regex = /type\s+(?<name>\w+)\s*=\s*(?<type>(?:(?:[\w\s\|\&]+)|(?:Array<[\w\s\[\],<>]+>)|(?:[\w\s\[\]]+\[]))|(?:\(\s*([\w\s,<>:]+)\s*\)\s*=>\s*\{?[\w\s,]*\}?)|(?:\(\s*([\w\s,<>:]+)\s*\)\s*=>\s*[\w\s<>]+))/;
    // 匹配类型别名声明
    const match = textMemberDeclaration.match(regex);
    if (!match || !match.groups) {
      ErrorNotifier.showMemberParseError(MemberType.TYPEDEF, startLineNumber)
      return new InterfaceMember()
    }
    // 解构提取类型别名信息
    const { name: _name, type: _type } = match.groups;
    // 返回封装的 TypedefMember 实例
    return new TypedefMember()
      .setName(_name)
      .setTypedef(true)
      .setType(_type)
  }

  private preHandle(memberDeclaration: MemberDeclaration): { textMemberDeclaration: string, startLineNumber: number } {
    let startLineNumber = memberDeclaration?.getStartLineNumber() || 0
    let endLineNumber = memberDeclaration?.getEndLineNumber()
    // 获取源文件的文本
    let text = this.document.getText();
    // 截取成员代码块所在的字符串（从 sn 行到 nn 行）
    let lines = text.split('\n');
    let textMemberDeclaration = lines.slice(startLineNumber - 1, endLineNumber).join('\n'); // -1 是因为行号从 1 开始，数组从 0 开始
    // 成员文本
    return { textMemberDeclaration, startLineNumber }
  }

  private parseArrowFunction(textMemberDeclaration: string): MethodMember | null {

    const regex = /(?<_access>private|protected|public)?\s*(?<_static>static)?\s*(?<async>async)?\s*(?<_name>\w+)\s*=\s*(?<asyncKeyword>async)?\s*\((?<_params>[^)]*)\)\s*(?::\s*(?<_returnType>[^ ]+))?\s*=>\s*[^a-zA-Z0-9]*\b(?<_exceptionType>\w*)\b/;

    const match = textMemberDeclaration.match(regex);
    if (!match || !match.groups) return null

    const { _access, _static, _async, _name, _params, _returnType, _exceptionType } = match.groups;

    // 返回方法成员
    return new MethodMember()
      .setName(_name)
      .setParams(this.parseParams(_params || '') || [])
      .setMethod(MethodType.METHOD)
      .setThrows(this.parseThrownErrors(_exceptionType || ""))
      .setStatic(!!_static)
      .setReturnType(_returnType)
      .setAccess(_access)
      .setAsync(!!_async)
  }

  private parseParams(paramString: string): string[][] {
    if (!paramString) return []
    // 去除空格并拆分参数
    const params = paramString.split(',').map(param => param.trim());

    // 将每个参数转换成 [name, type] 的形式
    return params.map(param => {
      const [name, type] = param.split(':').map(part => part.trim());
      return [name, type];
    });
  }


  private parseThrownErrors(methodBody: string): Set<string> {

    const regex = /throw\s+new\s+(\w+)\(/g;  // 捕获 `throw new Error()` 中的异常类型
    const matches = [...methodBody.matchAll(regex)];
    return new Set(matches.map(match => match[1]));  // 提取所有异常类型
  }
}