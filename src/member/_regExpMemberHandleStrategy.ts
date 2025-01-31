import { TextDocument } from "vscode"
import { ClassMember, EnumMember, InterfaceMember, Member, MethodMember, PropertyMember, TypedefMember } from "../parser/member"
import { MemberHandleStrategy } from "./memberHandleStrategy"
import { MemberDeclaration } from "../ast/astHelper"
import * as vscode from 'vscode';
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
    this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配类的基本信息：是否是 abstract 类、类名、继承类和实现接口
    const regex = /(?<abstract>abstract)?\s*class\s+(?<name>\w+)\s*(?:extends\s+(?<extends>\w+))?\s*(?:implements\s+(?<implements>[A-Za-z, ]+))?/;

    // 匹配类声明
    const match = this.textMemberDeclaration.match(regex);

    if (match && match.groups) {
      // 解构获取类的相关信息
      const { abstract, name, extends: extendClass, implements: implementsRaw } = match.groups;

      // 判断是否为 abstract 类
      const _abstract = !!abstract;
      // 获取类名
      const _name = name || '';
      // 获取继承的父类名
      const _extends = extendClass || '';
      // 解析实现的接口（可能有多个接口）
      const implementsList = implementsRaw ? implementsRaw.split(',').map(item => item.trim()) : [];

      // 返回封装的 ClassMember 实例
      return new ClassMember(_name, true, _abstract, _extends, implementsList);
    } else {
      let startLineNumber = memberDeclaration?.getStartLineNumber()

      vscode.window.showInformationMessage(`
        存在类声明解析失败，采用默认类注解，出错位置行号：${startLineNumber} 
        There is a class declaration parsing failure, using the default class annotation, error location line number：${startLineNumber} 
        `)
      return new ClassMember()
    }
  }
  handleMethod(memberDeclaration: MemberDeclaration): Member | null {
    this.preHandle(memberDeclaration)
    // 改进后的正则表达式
    const regex = /(?<accessModifier>public|private|protected)?\s*(?<static>static)?\s*(?<async>async)?\s*(?<name>\w+)\s*\((?<params>.*?)\)\s*(?::\s*(?<returnType>\w+))?(?:\s*throws\s*(?<throws>[\w, ]+))?/;

    // 匹配
    const match = this.textMemberDeclaration.match(regex);

    if (match && match.groups) {
      const { accessModifier, static: isStatic, async, name, params, returnType, throws } = match.groups;

      // 确保返回类型、成员名、访问修饰符等都存在
      const _name = name || '';
      const _params = this.parseParams(params || '');
      const _returns = returnType || ''; // 默认返回类型为空
      const _throws = this.parseThrownErrors(this.textMemberDeclaration); // 默认无异常
      const _async = async !== undefined;  // 判断是否为异步方法
      const _access = accessModifier || '';  // 默认访问修饰符为空
      const _static = !!isStatic; // 判断是否为静态方法
      let _function = true
      let _constructor = false
      if (name === "constructor") {
        _function = false
        _constructor = true
      }
      // 返回方法成员 
      return new MethodMember(_name, _async, _function, _constructor, _throws, _params, _returns, _static, _access);
    } else {
      let startLineNumber = memberDeclaration?.getStartLineNumber()
      vscode.window.showInformationMessage(`
        存在方法声明解析失败，采用默认方法注解，出错位置行号：${startLineNumber} 
        There is a method declaration parsing failure, using the default method annotation, error location line number：${startLineNumber} 
        `)
      return new MethodMember()
    }
  }
  handleProperty(memberDeclaration: MemberDeclaration): Member | null {
    this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配属性的声明信息（包括默认值）
    const regex = /(?<accessModifier>public|private|protected)?\s*(?<static>static)?\s*(?<name>\w+)\s*:\s*(?<type>\w+)\s*(?<defaultValue>=\s*[^;]+)?/;
    // 首先尝试解析箭头函数
    let methodMember = this.parseArrowFunction(this.textMemberDeclaration)
    if (methodMember) return methodMember
    // 匹配属性声明
    const match = this.textMemberDeclaration.match(regex);

    if (match && match.groups) {
      // 解构提取属性信息
      const { accessModifier, static: isStatic, name, type, defaultValue } = match.groups;

      // 获取访问修饰符，如果没有则默认为空字符串
      const _access = accessModifier || '';
      // 判断是否为静态属性
      const _static = !!isStatic;
      // 获取属性名
      const _name = name || '';
      // 获取属性类型
      const _type = type || '';
      // 获取属性默认值，如果没有则默认为空字符串
      const _default = defaultValue ? defaultValue.trim().slice(1).trim() : ''; // 去掉 `=` 号
      // 返回封装的 PropertyMember 实例
      return new PropertyMember(_name, true, _type, _static, _default, _access);
    } else {
      let startLineNumber = memberDeclaration?.getStartLineNumber()
      vscode.window.showInformationMessage(`
        存在属性声明解析失败，采用默认属性注解，出错位置行号：${startLineNumber} 
        There is a property declaration parsing failure, using the default property annotation, error location line number：${startLineNumber} 
        `)
      return new PropertyMember()
    }
  }
  handleInterface(memberDeclaration: MemberDeclaration): Member | null {
    this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配接口声明
    const regex = /interface\s+(?<name>\w+)\s*(?:extends\s+(?<extends>\w+(?:,\s*\w+)*))?/;

    // 匹配接口声明
    const match = this.textMemberDeclaration.match(regex);

    if (match && match.groups) {
      // 解构提取接口信息
      const { name, extends: extendsRaw } = match.groups;

      // 获取接口名称
      const _name = name || '';

      // 解析继承的接口列表（如果有的话）
      const _extends = extendsRaw ? extendsRaw.split(',').map(item => item.trim()) : [];

      // 返回封装的 InterfaceMember 实例
      return new InterfaceMember(_name, true, _extends);
    } else {
      let startLineNumber = memberDeclaration?.getStartLineNumber()

      vscode.window.showInformationMessage(`
        存在接口声明解析失败，采用默认接口注解，出错位置行号：${startLineNumber} 
        There is a interface declaration parsing failure, using the default interface annotation, error location line number：${startLineNumber} 
        `)
      return new InterfaceMember()
    }
  }
  handleEnum(memberDeclaration: MemberDeclaration): Member | null {
    this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配枚举声明
    const regex = /enum\s+(?<name>\w+)\s*{(?<members>[^}]+)}/;

    // 匹配枚举声明
    const match = this.textMemberDeclaration.match(regex);

    if (match && match.groups) {
      // 解构提取枚举信息
      const { name, members } = match.groups;

      // 获取枚举名称
      const _name = name || '';

      // 获取枚举成员（处理成员中的默认值）
      const _members = members.split(',').map(member => {
        const [memberName, value] = member.split('=').map(item => item.trim());
        return {
          name: memberName,
          value: value ? value.trim() : undefined  // 如果有显式值则返回值，否则为 undefined
        };
      });

      // 返回封装的 EnumMember 实例
      return new EnumMember(_name, true, _members);
    } else {
      let startLineNumber = memberDeclaration?.getStartLineNumber()

      vscode.window.showInformationMessage(`
        存在枚举声明解析失败，采用默认枚举注解，出错位置行号：${startLineNumber} 
        There is a enum declaration parsing failure, using the default enum annotation, error location line number：${startLineNumber} 
        `)
      return new EnumMember()
    }
  }
  handleTypedef(memberDeclaration: MemberDeclaration): Member | null {
    this.preHandle(memberDeclaration)
    // 正则表达式，用于匹配类型别名（typedef）
    // const regex = /type\s+(?<name>\w+)\s*=\s*(?<type>[\w\s\|\&\(\)\[\]]+)/;
    const regex = /type\s+(?<name>\w+)\s*=\s*(?<type>(?:(?:[\w\s\|\&]+)|(?:Array<[\w\s\[\],<>]+>)|(?:[\w\s\[\]]+\[]))|(?:\(\s*([\w\s,<>:]+)\s*\)\s*=>\s*\{?[\w\s,]*\}?)|(?:\(\s*([\w\s,<>:]+)\s*\)\s*=>\s*[\w\s<>]+))/;

    // 匹配类型别名声明
    const match = this.textMemberDeclaration.match(regex);

    if (match && match.groups) {
      // 解构提取类型别名信息
      const { name, type } = match.groups;

      // 获取类型别名名称
      const _name = name || '';

      // 获取类型定义
      const _type = type || '';

      // 返回封装的 TypedefMember 实例
      return new TypedefMember(_name, true, _type);
    } else {
      let startLineNumber = memberDeclaration?.getStartLineNumber()

      vscode.window.showInformationMessage(`
        存在自定义类型声明解析失败，采用默认接口注解，出错位置行号：${startLineNumber} 
        There is a typedef declaration parsing failure, using the default typedef annotation, error location line number：${startLineNumber} 
        `)
      return new TypedefMember()
    }
  }

  private preHandle(memberDeclaration: MemberDeclaration) {
    let startLineNumber = memberDeclaration?.getStartLineNumber() || 0
    let endLineNumber = memberDeclaration?.getEndLineNumber()
    // 获取源文件的文本
    let text = this.document.getText();
    // 截取成员代码块所在的字符串（从 sn 行到 nn 行）
    let lines = text.split('\n');
    let memberText = lines.slice(startLineNumber - 1, endLineNumber).join('\n'); // -1 是因为行号从 1 开始，数组从 0 开始
    // 成员文本
    this.textMemberDeclaration = memberText
  }
  /**
     * 解析箭头函数
     */
  private parseArrowFunction(textMemberDeclaration: string): MethodMember | null {

    const regex = /(?<accessModifier>private|protected|public)?\s*(?<static>static)?\s*(?<async>async)?\s*(?<functionName>\w+)\s*=\s*(?<asyncKeyword>async)?\s*\((?<params>[^)]*)\)\s*(?::\s*(?<returnType>[^ ]+))?\s*=>\s*[^a-zA-Z0-9]*\b(?<exceptionType>\w*)\b/;

    const match = textMemberDeclaration.match(regex);

    if (match && match.groups) {
      const { accessModifier, static: isStatic, async: isAsync, functionName, params, returnType, exceptionType } = match.groups;


      // 确保返回类型、成员名、访问修饰符等都存在
      const _name = functionName || '';
      const _params = this.parseParams(params || '') || [];
      const _returns = returnType || ''; // 默认返回类型为空
      const _throws = this.parseThrownErrors(exceptionType || ""); // 默认无异常
      const _async = isAsync !== undefined;  // 判断是否为异步方法
      const _access = accessModifier || '';  // 默认访问修饰符为空
      const _static = !!isStatic; // 判断是否为静态方法


      // 返回方法成员
      return new MethodMember(_name, _async, true, false, _throws, _params, _returns, _static, _access);

    }
    return null
  }
  /**
     * 参数解析
     */
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

  /**
   *  解析方法体中抛出的异常
   * @param methodBody 方法体字符串
   * @returns 
   */
  private parseThrownErrors(methodBody: string): Set<string> {

    const regex = /throw\s+new\s+(\w+)\(/g;  // 捕获 `throw new Error()` 中的异常类型
    const matches = [...methodBody.matchAll(regex)];
    return new Set(matches.map(match => match[1]));  // 提取所有异常类型
  }
}