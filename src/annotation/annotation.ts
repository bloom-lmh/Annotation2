import { BaseAnnotationConfig, ClassAnnotationConfig, EnumAnnotationConfig, FileAnnotationConfig, GlobalAnnotationConfig, InterfaceAnnotationConfig, MethodAnnotationConfig, PropertyAnnotationConfig, TypedefAnnotationConfig } from "../config/config"
import { JSDocGenerator } from "../generator/jsDocGenerator"
import { ClassMember, EnumMember, InterfaceMember, Member, MethodMember, PropertyMember, TypedefMember } from "../parser/member"

/**
 * 全体注解公共标签
 */
export class BaseAnnotation<T extends BaseAnnotationConfig> {

    protected _authorTag: string = ""
    protected _accessTag: string = ""
    protected _aliasTag: boolean = false
    protected _versionTag: string = ""
    protected _nameTag: string = ""
    protected _descriptionTag: string = ""
    protected _licenseTag: string = ""
    protected _copyrightTag: string = ""
    protected _seeTag: boolean = false
    protected _summaryTag: boolean = false
    protected _exampleTag: boolean = false

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: T, member: Member) {
        // 解构全局配置
        const { author: authorValue, version: versionValue, description: descriptionValue, license: licenseValue, copyright: copyrightValue } = globalAnnotationConfig
        // 获取方法配置
        const { author, alias, version, name, description, license, copyright, see, summary, example } = concreteAnnotationConfig
        // 解构成员信息
        const { name: _name } = member
        // 成员名
        this._nameTag = name ? _name : ""
        // 作者标签
        this._authorTag = author ? authorValue : ""
        // 版本标签
        this._versionTag = version ? versionValue : ""
        // 执照标签
        this._licenseTag = license ? licenseValue : ""
        // 版权标签
        this._copyrightTag = copyright ? copyrightValue : ""
        // 描述信息标签
        this._descriptionTag = description ? descriptionValue : ""
        // 别名标签
        this._aliasTag = alias
        // 参考标签
        this._seeTag = see
        // 总结标签
        this._summaryTag = summary
        // 案例标签
        this._exampleTag = example

    }
    setAuthorTag(tag: string): this {
        this._authorTag = tag;
        return this;
    }

    setAccessTag(tag: string): this {
        this._accessTag = tag;
        return this;
    }

    setAliasTag(tag: boolean): this {
        this._aliasTag = tag;
        return this;
    }

    setVersionTag(tag: string): this {
        this._versionTag = tag;
        return this;
    }

    setNameTag(tag: string): this {
        this._nameTag = tag;
        return this;
    }

    setDescriptionTag(tag: string): this {
        this._descriptionTag = tag;
        return this;
    }

    setLicenseTag(tag: string): this {
        this._licenseTag = tag;
        return this;
    }

    setCopyrightTag(tag: string): this {
        this._copyrightTag = tag;
        return this;
    }

    setSeeTag(tag: boolean): this {
        this._seeTag = tag;
        return this;
    }

    setSummaryTag(tag: boolean): this {
        this._summaryTag = tag;
        return this;
    }

    setExampleTag(tag: boolean): this {
        this._exampleTag = tag;
        return this;
    }
    /*  public buildAnnotation(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: T): T {
        
 
         // 返回注解
         return new BaseAnnotation()
     } */

    public buildJSDoc(): string {
        let jsdoc = new JSDocGenerator()
            .setAuthorTag(this._authorTag)
            .setAccessTag(this._accessTag)
            .setAliasTag(this._aliasTag)
            .setVersionTag(this._versionTag)
            .setNameTag(this._nameTag)
            .setDescriptionTag(this._descriptionTag)
            .setLicenseTag(this._licenseTag)
            .setCopyrightTag(this._copyrightTag)
            .setSeeTag(this._seeTag)
            .setSummaryTag(this._summaryTag)
            .setExampleTag(this._exampleTag)
            .build()
        return jsdoc
    }
}
/**
 * 类注解模型
 */
export class ClassAnnotation extends BaseAnnotation<ClassAnnotationConfig> {
    private _classTag: boolean = true;
    private _abstract: boolean = false;
    private _extendsTag: string = "";
    private _implementsTag: Array<string> = []

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: ClassAnnotationConfig, member: ClassMember) {
        super(globalAnnotationConfig, concreteAnnotationConfig, member)
        // 解构配置
        const { abstract: abstractTag, extends: extendsTag, implements: implementsTag } = concreteAnnotationConfig
        // 解构拾取的成员信息
        const { name: _name, abstract: _abstract, extends: _extends, implements: _implements } = member
        // 获取抽象标志
        this._abstract = abstractTag ? _abstract : false
        // 获取继承的类名
        this._extendsTag = extendsTag ? _extends : ""
        // 获取实现的接口
        this._implementsTag = implementsTag ? _implements : []
    }

    setClassTag(value: boolean): this {
        this._classTag = value;
        return this;
    }

    setAbstract(value: boolean): this {
        this._abstract = value;
        return this;
    }

    setExtendsTag(value: string): this {
        this._extendsTag = value;
        return this;
    }

    setImplementsTag(value: Array<string>): this {
        this._implementsTag = value;
        return this;
    }


    public buildJSDoc(): string {
        let other = super.buildJSDoc()
        let jsdoc = new JSDocGenerator()
            .setClassTag(this._classTag)
            .setAbstract(this._abstract)
            .setExtendsTag(this._extendsTag)
            .setImplementsTag(this._implementsTag)
            .union(other)
            .build()
        return jsdoc
    }
}
/**
 * 方法注解模型
 */
export class MethodAnnotation extends BaseAnnotation<MethodAnnotationConfig> {
    private _asyncTag: boolean = false;
    private _functionTag: boolean = true;
    private _throwsTag: Set<string> = new Set<string>;
    private _paramsTag: string[][] = [[]];
    private _returnsTag: string = "";
    private _staticTag: boolean = true;

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: MethodAnnotationConfig, member: MethodMember) {
        super(globalAnnotationConfig, concreteAnnotationConfig, member)
        // 解构配置
        const { params, returns, throws, async, function: func, access, static: staticTag } = concreteAnnotationConfig
        // 解构成员信息
        const { name: _name, async: _async, throws: _throws, params: _params, returns: _returns, static: _static, access: _access } = member
        // 方法标签
        this._functionTag = func ? func : false
        // 获取方法参数
        this._paramsTag = params ? _params : []
        // 获取方法返回值
        this._returnsTag = returns ? _returns : ""
        // 获取方法抛出异常
        this._throwsTag = throws ? _throws : new Set<string>
        // 获取方法是否异步
        this._asyncTag = async ? _async : false
        // 获取方法访问控制信息
        this._accessTag = access ? _access : ""
        // 是否静态
        this._staticTag = staticTag ? _static : false
    }

    setAsyncTag(value: boolean): this {
        this._asyncTag = value;
        return this;
    }

    setFunctionTag(value: boolean): this {
        this._functionTag = value;
        return this;
    }

    setThrowsTag(value: Set<string>): this {
        this._throwsTag = value;
        return this;
    }

    setParamsTag(value: string[][]): this {
        this._paramsTag = value;
        return this;
    }

    setReturnsTag(value: string): this {
        this._returnsTag = value;
        return this;
    }

    setStaticTag(value: boolean): this {
        this._staticTag = value;
        return this;
    }

    public buildJSDoc(): string {
        let other = super.buildJSDoc()
        let jsdoc = new JSDocGenerator()
            .setFunctionTag(this._functionTag)
            .setAsyncTag(this._asyncTag)
            .setStaticTag(this._staticTag)
            .setParamsTag(this._paramsTag)
            .setThrowsTag(this._throwsTag)
            .setReturnsTag(this._returnsTag)
            .union(other)
            .build()
        return jsdoc
    }
}
/**
 * 属性注解模型
 */
export class PropertyAnnotation extends BaseAnnotation<PropertyAnnotationConfig> {
    private _propertyTag: boolean = true;
    private _typeTag: string = "";
    private _staticTag: boolean = false;
    private _defaultTag: string = "";

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: PropertyAnnotationConfig, member: PropertyMember) {
        super(globalAnnotationConfig, concreteAnnotationConfig, member)
        // 解构配置
        const { type, default: defaultTag, static: staticTag, access } = concreteAnnotationConfig
        // 解构成员信息
        const { name: _name, type: _type, static: _static, default: _default, access: _access } = member
        // 获取属性参数
        this._typeTag = type ? _type : ""
        // 获取默认值
        this._defaultTag = defaultTag ? _default || "" : ""
        // 获取访问权限修饰符
        this._accessTag = access ? _access : ""
        // 获取是否静态变量
        this._staticTag = staticTag ? _static : false
    }

    setPropertyTag(value: boolean): this {
        this._propertyTag = value;
        return this;
    }
    setTypeTag(value: string): this {
        this._typeTag = value;
        return this;
    }

    setStaticTag(value: boolean): this {
        this._staticTag = value;
        return this;
    }

    setDefaultTag(value: string): this {
        this._defaultTag = value
        return this
    }

    public get propertyTag(): boolean {
        return this._propertyTag;
    }

    public get typeTag(): string {
        return this._typeTag;
    }

    public get staticTag(): boolean {
        return this._staticTag;
    }

    public get defaultTag(): string {
        return this._defaultTag;
    }
    public buildJSDoc(): string {
        let other = super.buildJSDoc()
        let jsdoc = new JSDocGenerator()
            .setTypeTag(this._typeTag)
            .setStaticTag(this.staticTag)
            .setDefaultTag(this.defaultTag)
            .union(other)
            .build()
        return jsdoc
    }
}
/**
 * 接口注解
 */
export class InterfaceAnnotation extends BaseAnnotation<InterfaceAnnotationConfig> {
    private _interfaceTag: boolean = true;
    private _extends: string[] = []

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: InterfaceAnnotationConfig, member: InterfaceMember) {
        super(globalAnnotationConfig, concreteAnnotationConfig, member)
        // 解构配置
        const { interface: interfaceValue } = concreteAnnotationConfig
        // 解构成员信息
        const { name: _name, extends: _extends } = member
        // 设置属性
        this._interfaceTag = interfaceValue
        this._extends = _extends
    }
    setInterfaceTag(value: boolean): this {
        this._interfaceTag = value;
        return this;
    }
    public get interfaceTag(): boolean {
        return this._interfaceTag;
    }

    public buildJSDoc(): string {
        let other = super.buildJSDoc()
        let jsdoc = new JSDocGenerator()
            .setInterfaceTag(this._interfaceTag)
            .union(other)
            .build()
        return jsdoc
    }
}



/**
 * 枚举注解
 */
export class EnumAnnotation extends BaseAnnotation<EnumAnnotationConfig> {
    private _enumTag: boolean = true;
    private _enumMembersTag: { name: string; value: string | undefined; }[] = []

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: EnumAnnotationConfig, member: EnumMember) {
        super(globalAnnotationConfig, concreteAnnotationConfig, member)
        // 解构配置
        const { enum: enumValue } = concreteAnnotationConfig
        // 解构成员信息
        const { enum: _enum, enumMembers } = member
        // 设置属性
        this._enumTag = enumValue
        this._enumMembersTag = enumMembers
    }

    setEnumTag(value: boolean): this {
        this._enumTag = value;
        return this;
    }

    public buildJSDoc(): string {
        let other = super.buildJSDoc()
        let jsdoc = new JSDocGenerator()
            .setEnumTag(this._enumTag)
            .setNameTag(this._nameTag)
            .union(other)
            .build()
        return jsdoc
    }
}

/**
 * 自定义类型注解
 */
export class TypedefAnnotation extends BaseAnnotation<TypedefAnnotationConfig> {
    private _typedefTag: boolean = true;
    private _typeTag: string = ""

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: TypedefAnnotationConfig, member: TypedefMember) {
        super(globalAnnotationConfig, concreteAnnotationConfig, member)
        // 结构配置
        const { type, typedef } = concreteAnnotationConfig
        // 解构成员信息
        const { type: _type } = member
        // 设置属性
        this._typedefTag = typedef
        this._typeTag = type ? _type : ""

    }

    setTypedefTag(value: boolean): this {
        this._typedefTag = value;
        return this;
    }

    setTypeTag(value: string): this {
        this._typeTag = value;
        return this;
    }

    public buildJSDoc(): string {
        let other = super.buildJSDoc()
        let jsdoc = new JSDocGenerator()
            .setTypedefTag(this._typeTag, this._nameTag)
            .union(other)
            .build()
        return jsdoc
    }
}
/**
 * 文件注解
 */
export class FileAnnotation extends BaseAnnotation<FileAnnotationConfig> {
    private _fileTag: boolean = false;
    private _moduleTag: boolean = false;

    setFileTag(value: boolean): this {
        this._fileTag = value;
        return this;
    }

    setModuleTag(value: boolean): this {
        this._moduleTag = value;
        return this;
    }
    public buildJSDoc(): string {
        let other = super.buildJSDoc()
        let jsdoc = new JSDocGenerator()
            .setFileTag(this._fileTag)
            .setModuleTag(this._moduleTag)
            .union(other)
            .build()
        return jsdoc
    }
}


