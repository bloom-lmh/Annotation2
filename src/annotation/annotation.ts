import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph"
import { BaseAnnotationConfig, ClassAnnotationConfig, EnumAnnotationConfig, FileAnnotationConfig, GlobalAnnotationConfig, InterfaceAnnotationConfig, MethodAnnotationConfig, PropertyAnnotationConfig, TypedefAnnotationConfig } from "../config/config"
import { JSDocGenerator } from "../generator/jsDocGenerator"
import { AstUtil, MemberDeclaration } from "../utils/astUtil"

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

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: T, memberDeclaration: MemberDeclaration) {
        // 解构全局配置
        const { author: authorValue, version: versionValue, description: descriptionValue, license: licenseValue, copyright: copyrightValue } = globalAnnotationConfig
        // 获取方法配置
        const { author, alias, version, name, description, license, copyright, see, summary, example } = concreteAnnotationConfig
        // 成员名
        this._nameTag = name ? memberDeclaration?.getName() || "" : ""
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
 * 接口注解
 */
export class InterfaceAnnotation extends BaseAnnotation<InterfaceAnnotationConfig> {
    private _interfaceTag: boolean = true;

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: InterfaceAnnotationConfig, memberDeclaration: InterfaceDeclaration) {
        super(globalAnnotationConfig, concreteAnnotationConfig, memberDeclaration)
        const { interface: interfaceValue } = concreteAnnotationConfig
        this._interfaceTag = interfaceValue
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

/**
 * 枚举注解
 */
export class EnumAnnotation extends BaseAnnotation<EnumAnnotationConfig> {
    private _enumTag: boolean = true;

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: EnumAnnotationConfig, memberDeclaration: EnumDeclaration) {
        super(globalAnnotationConfig, concreteAnnotationConfig, memberDeclaration)
        const { enum: enumValue } = concreteAnnotationConfig
        this._enumTag = enumValue
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

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: TypedefAnnotationConfig, memberDeclaration: TypeAliasDeclaration) {
        super(globalAnnotationConfig, concreteAnnotationConfig, memberDeclaration)
        const { type, typedef } = concreteAnnotationConfig
        this._typedefTag = typedef
        this._typeTag = type ? AstUtil.getType(memberDeclaration) : ""

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
 * 类注解模型
 */
export class ClassAnnotation extends BaseAnnotation<ClassAnnotationConfig> {
    private _classTag: boolean = true;
    private _abstract: boolean = false;
    private _extendsTag: string = "";
    private _implementsTag: Array<string> = []

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: ClassAnnotationConfig, memberDeclaration: ClassDeclaration) {
        super(globalAnnotationConfig, concreteAnnotationConfig, memberDeclaration)
        const { abstract: abstractTag, extends: extendsTag, implements: implementsTag } = concreteAnnotationConfig
        // 获取抽象标志
        this._abstract = abstractTag ? memberDeclaration.isAbstract() : false
        // 获取继承的类名
        this._extendsTag = extendsTag ? memberDeclaration.getExtends()?.getText() || "" : ""
        // 获取实现的接口
        this._implementsTag = implementsTag ? memberDeclaration.getImplements().map(implement => {
            return implement.getText()
        }) : []
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

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: MethodAnnotationConfig, memberDeclaration: MethodDeclaration | FunctionDeclaration) {
        super(globalAnnotationConfig, concreteAnnotationConfig, memberDeclaration)
        const { params, returns, throws, async, function: func, access } = concreteAnnotationConfig
        // 方法标签
        this._functionTag = func ? func : false
        // 获取方法参数
        this._paramsTag = params ? memberDeclaration.getParameters().map(param => {
            return [param.getName(), param.getType().getText()]
        }) : []
        // 获取方法返回值
        this._returnsTag = returns ? memberDeclaration.getReturnType().getText() : ""
        // 获取方法抛出异常
        this._throwsTag = throws ? AstUtil.getMethodThrows(memberDeclaration) : new Set<string>
        // 获取方法是否异步
        this._asyncTag = async ? !!memberDeclaration.getAsyncKeyword()?.getText() : false
        // 获取方法访问控制信息
        this._accessTag = access ? AstUtil.getModefier(memberDeclaration) : ""
        /* if (access) {
            memberDeclaration.getModifiers().forEach(modifier => {
                if (modifier.getText()) {
                    _access = modifier.getText()
                }
            })
        } */
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

    constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: PropertyAnnotationConfig, memberDeclaration: PropertyDeclaration) {
        super(globalAnnotationConfig, concreteAnnotationConfig, memberDeclaration)

        const { type, property, default: defaultTag, static: staticTag, access } = concreteAnnotationConfig
        // 获取属性参数
        this._typeTag = type ? memberDeclaration.getType().getText() : ""
        // 获取默认值
        this._defaultTag = defaultTag ? memberDeclaration.getInitializer()?.getText() || "" : ""
        // 获取访问权限修饰符
        this._accessTag = ""
        if (access) {
            memberDeclaration.getModifiers().forEach(modifier => {
                if (modifier.getText() && modifier.getText() !== "static") {
                    this._accessTag = modifier.getText()
                }
            })
        }
        // 获取是否静态变量
        this._staticTag = staticTag ? memberDeclaration.isStatic() : false
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