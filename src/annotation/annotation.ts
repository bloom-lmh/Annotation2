import { JSDocGenerator } from "../generator/jsDocGenerator"

/**
 * 全体注解公共标签
 */
export class BaseAnnotation {
    protected _authorTag: string = ""
    protected _accessTag: string = ""
    protected _aliasTag: string = ""
    protected _versionTag: string = ""
    protected _nameTag: string = ""
    protected _descriptionTag: string = ""
    protected _licenseTag: string = ""
    protected _copyrightTag: string = ""
    protected _seeTag: string = ""
    protected _summaryTag: string = ""
    protected _exampleTag: string = ""


    setAuthorTag(tag: string): this {
        this._authorTag = tag;
        return this;
    }

    setAccessTag(tag: string): this {
        this._accessTag = tag;
        return this;
    }

    setAliasTag(tag: string): this {
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

    setSeeTag(tag: string): this {
        this._seeTag = tag;
        return this;
    }

    setSummaryTag(tag: string): this {
        this._summaryTag = tag;
        return this;
    }

    setExampleTag(tag: string): this {
        this._exampleTag = tag;
        return this;
    }

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
export class InterfaceAnnotation extends BaseAnnotation {
    private _interfaceTag: boolean = true;

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
export class FileAnnotation extends BaseAnnotation {
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
export class EnumAnnotation extends BaseAnnotation {
    private _enumTag: boolean = true;

    setEnumTag(value: boolean): this {
        this._enumTag = value;
        return this;
    }

    public buildJSDoc(): string {
        let jsdoc = "/**"
        this._nameTag && (jsdoc += `\n * @name ${this._nameTag}`)
        this._enumTag && (jsdoc += `\n * @enum`)
        jsdoc += '\n */'
        return jsdoc
    }
}

/**
 * 自定义类型注解
 */
export class TypedefAnnotation extends BaseAnnotation {
    private _typedefTag: boolean = true;
    private _typeTag: string = ""

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
export class ClassAnnotation extends BaseAnnotation {
    private _classTag: boolean = true;
    private _abstract: boolean = false;
    private _extendsTag: string = "";
    private _implementsTag: Array<string> = []

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
export class MethodAnnotation extends BaseAnnotation {
    private _asyncTag: boolean = false;
    private _functionTag: boolean = true;
    private _throwsTag: Set<string> = new Set<string>;
    private _paramsTag: string[][] = [[]];
    private _returnsTag: string = "";
    private _staticTag: boolean = true;

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
export class PropertyAnnotation extends BaseAnnotation {
    private _propertyTag: boolean = true;
    private _typeTag: string = "";
    private _staticTag: boolean = false;
    private _defaultTag: string = "";

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