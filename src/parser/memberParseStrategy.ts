import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph";
import { AstUtil, MemberDeclaration } from "../utils/astUtil";
import { ClassMember, InterfaceMember, MemberType, MethodMember, EnumMember, PropertyMember, TypedefMember } from "./member";
import { TextDocument } from "vscode";

/**
 * 成员信息解析器
 */
export abstract class MemberParseStrategy {
    protected memberDeclaration: MemberDeclaration

    constructor(memberDeclaration: MemberDeclaration) {
        this.memberDeclaration = memberDeclaration
    }

    public parseMember(): MemberType | null {
        // 若是方法，创建方法注释对象
        if (this.memberDeclaration instanceof MethodDeclaration || this.memberDeclaration instanceof FunctionDeclaration) {
            return this.parseMethod()
        }
        // 若是属性，创建属性注释对象
        if (this.memberDeclaration instanceof PropertyDeclaration) {
            return this.parseProperty()
        }
        // 若是类，创建类注释对象
        if (this.memberDeclaration instanceof ClassDeclaration) {
            return this.parseClass()
        }
        // 若是枚举，创建枚举注释对象
        if (this.memberDeclaration instanceof EnumDeclaration) {
            // return this.parseEnum()
        }
        // 若是接口，创建接口注释对象
        if (this.memberDeclaration instanceof InterfaceDeclaration) {
            return this.parseInterface()
        }

        // 若是自定义类型，创建自定义类型注释对象
        if (this.memberDeclaration instanceof TypeAliasDeclaration) {
            return this.parseTypedef()
        }
        return null
    }
    /**
    * 解析类
    */
    protected parseClass(): ClassMember {
        this.memberDeclaration = (this.memberDeclaration as ClassDeclaration)
        // 成员名
        const _name = this.memberDeclaration?.getName()
        // 获取抽象标志
        const _abstract = this.memberDeclaration?.isAbstract()
        // 获取继承的类名
        const _extends = this.memberDeclaration.getExtends()?.getText()
        // 获取实现的接口
        const _implements = this.memberDeclaration.getImplements().map(implement => {
            return implement.getText()
        })
        return new ClassMember(_name, true, _abstract, _extends, _implements)
    }
    /**
     * 解析方法
     */
    protected parseMethod(): MethodMember {
        this.memberDeclaration = (this.memberDeclaration as MethodDeclaration | FunctionDeclaration)
        // 成员名
        const _name = this.memberDeclaration?.getName()
        // 获取方法参数
        const _params = this.memberDeclaration.getParameters().map(param => {
            return [param.getName(), param.getType().getText()]
        })
        // 获取方法返回值
        const _returns = this.memberDeclaration.getReturnType().getText()
        // 获取方法抛出异常
        const _throws = AstUtil.getMethodThrows(this.memberDeclaration)
        // 获取方法是否异步
        const _async = !!this.memberDeclaration.getAsyncKeyword()?.getText()
        // 获取方法访问控制信息
        const _access = AstUtil.getModefier(this.memberDeclaration)
        // 返回方法成员
        // todo 判断static
        return new MethodMember(_name, _async, true, _throws, _params, _returns, true, _access)
    }

    /**
     * 解析属性
     */
    protected parseProperty(): PropertyMember | MethodMember {
        this.memberDeclaration = (this.memberDeclaration as PropertyDeclaration)
        // 成员名
        const _name = this.memberDeclaration?.getName()
        // 获取属性参数
        const _type = this.memberDeclaration.getType().getText()
        // 获取默认值
        const _default = this.memberDeclaration.getInitializer()?.getText()
        // 获取访问权限修饰符
        const _access = AstUtil.getModefier(this.memberDeclaration)
        // 获取是否静态变量
        const _static = this.memberDeclaration.isStatic()
        // 返回属性成员
        return new PropertyMember(_name, true, _type, _static, _default)
    }

    /**
     * 解析接口
     */
    protected parseInterface(): InterfaceMember {
        this.memberDeclaration = (this.memberDeclaration as InterfaceDeclaration)
        // 成员名
        const _name = this.memberDeclaration?.getName()
        // 返回接口成员
        return new InterfaceMember(_name, true)
    }

    /**
     * 解析枚举
     */
    protected parseEnum(): EnumMember {
        this.memberDeclaration = (this.memberDeclaration as EnumDeclaration)
        // 成员名
        const _name = this.memberDeclaration?.getName()
        // 返回接口成员
        return new EnumMember(_name, true)
    }

    /**
     * 解析自定义类
     */
    protected parseTypedef(): TypedefMember {
        this.memberDeclaration = (this.memberDeclaration as TypeAliasDeclaration)
        // 成员名
        const _name = this.memberDeclaration?.getName()
        // 类型
        const _type = AstUtil.getType(this.memberDeclaration)
        // 返回接口成员
        return new TypedefMember(_name, true, _type)
    }
}


/**
 * 正则解析器
 */
export class RegExpParseStrategy extends MemberParseStrategy {
    /**
     * 文本片段
     */
    private textMemberDeclaration: string


    constructor(memberDeclaration: MemberDeclaration, document: TextDocument) {
        super(memberDeclaration)
        // 获取成员所在开始行和结束行
        let startLineNumber = this.memberDeclaration?.getStartLineNumber() || 0
        let endLineNumber = this.memberDeclaration?.getEndLineNumber()
        // 获取源文件的文本
        let text = document.getText();

        // 截取成员代码块所在的字符串（从 sn 行到 nn 行）
        let lines = text.split('\n');
        let memberText = lines.slice(startLineNumber - 1, endLineNumber).join('\n'); // -1 是因为行号从 1 开始，数组从 0 开始
        // 成员文本
        this.textMemberDeclaration = memberText
    }
    /**
      * 解析类
      */
    protected parseClass(): ClassMember {
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
            // 如果没有匹配到类信息，抛出异常
            throw new Error("Class declaration parsing failed.");
        }
    }
    /**
     * 解析方法
     */
    protected parseMethod(): MethodMember {
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
            const _throws = this.parseThrownErrors(throws || ""); // 默认无异常
            const _async = async !== undefined;  // 判断是否为异步方法
            const _access = accessModifier || '';  // 默认访问修饰符为空
            const _static = !!isStatic; // 判断是否为静态方法

            // 返回方法成员
            return new MethodMember(_name, _async, true, _throws, _params, _returns, _static, _access);
        } else {
            // 如果没有匹配到任何内容，返回默认值或者抛出异常
            throw new Error("Method declaration parsing failed.");
        }
    }
    /**
     * 解析属性
     */
    protected parseProperty(): PropertyMember | MethodMember {
        // 正则表达式，用于匹配属性的声明信息（包括默认值）
        const regex = /(?<accessModifier>public|private|protected)?\s*(?<static>static)?\s*(?<name>\w+)\s*:\s*(?<type>\w+)\s*(?<defaultValue>=\s*[^;]+)?/;

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
            // 如果没有匹配到属性声明，抛出异常
            throw new Error("Property declaration parsing failed.");
        }
    }



    /**
     * 解析接口
     */
    protected parseInterface(): InterfaceMember {
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
            // 如果没有匹配到接口声明，抛出异常
            throw new Error("Interface declaration parsing failed.");
        }
    }

    /**
     * 解析枚举
     */
    protected parseEnum(): EnumMember {
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
            // 如果没有匹配到枚举声明，抛出异常
            throw new Error("Enum declaration parsing failed.");
        }
    }

    /**
     * 解析自定义类
     */
    protected parseTypedef(): TypedefMember {
        // 正则表达式，用于匹配类型别名（typedef）
        const regex = /type\s+(?<name>\w+)\s*=\s*(?<type>[\w\s\|\&\(\)\[\]]+)/;

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
            // 如果没有匹配到类型别名声明，抛出异常
            throw new Error("Typedef declaration parsing failed.");
        }
    }

    /**
     * 参数解析
     */
    private parseParams(paramString: string): string[][] {
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
/**
 * 抽象语法树解析器
 */
export class AstParseStrategy extends MemberParseStrategy {


}