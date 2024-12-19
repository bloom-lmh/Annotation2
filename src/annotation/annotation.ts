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
    protected _tutorialTag: string = ""
    protected _seeTag: string = ""
    protected _summaryTag: string = ""
    protected _exampleTag: string = ""
    protected _requiresTag: Array<string> = []


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

    setTutorialTag(tag: string): this {
        this._tutorialTag = tag;
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

    setRequiresTag(tags: Array<string>): this {
        this._requiresTag = tags;
        return this;
    }

    public get authorTag(): string {
        return this._authorTag;
    }

    public get accessTag(): string {
        return this._accessTag;
    }

    public get aliasTag(): string {
        return this._aliasTag;
    }

    public get versionTag(): string {
        return this._versionTag;
    }

    public get nameTag(): string {
        return this._nameTag;
    }

    public get descriptionTag(): string {
        return this._descriptionTag;
    }

    public get licenseTag(): string {
        return this._licenseTag;
    }

    public get copyrightTag(): string {
        return this._copyrightTag;
    }

    public get tutorialTag(): string {
        return this._tutorialTag;
    }

    public get seeTag(): string {
        return this._seeTag;
    }

    public get summaryTag(): string {
        return this._summaryTag;
    }

    public get exampleTag(): string {
        return this._exampleTag;
    }

    public get requiresTag(): Array<string> {
        return this._requiresTag;
    }

    public buildJSDoc(): string {
        let jsdoc = ""
        this._accessTag && (jsdoc += `@access ${this.accessTag}`)
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
        let jsdoc = "/**"
        this._nameTag && (jsdoc += `\n * @name ${this._nameTag}`)
        this._interfaceTag && (jsdoc += `\n * @interface`)
        jsdoc += '\n */'
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
    // 简单的 get 访问器
    public get fileTag(): boolean {
        return this._fileTag;
    }

    public get moduleTag(): boolean {
        return this._moduleTag;
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
    public get typedefTag(): boolean {
        return this._typedefTag;
    }

    public get typeTag(): string {
        return this._typeTag;
    }

    public buildJSDoc(): string {
        let jsdoc = "/**"
        this._nameTag && (jsdoc += `\n * @name ${this._nameTag}`)
        this._typedefTag && (jsdoc += `\n * @typedef {${this._typeTag}} ${this.nameTag}`)
        jsdoc += '\n */'
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

    // 简单的 get 访问器
    public get classTag(): boolean {
        return this._classTag;
    }

    public get abstract(): boolean {
        return this._abstract;
    }

    public get extendsTag(): string {
        return this._extendsTag;
    }

    public get implementsTag(): Array<string> {
        return this._implementsTag;
    }

    public buildJSDoc(): string {
        let jsdoc = "/**"
        this._nameTag && (jsdoc += `\n * @name ${this._nameTag}`)
        this._classTag && (jsdoc += `\n * @class`)
        this._abstract && (jsdoc += `\n * @abstract`)
        this._extendsTag && (jsdoc += `\n * @extends ${this._extendsTag}`)
        if (this._implementsTag && this._implementsTag.length > 0) {
            this.implementsTag.forEach(implement => {
                jsdoc += `\n* @implements {${implement}}`
            })
        }
        jsdoc += '\n */'
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
    // 简单的 get 访问器
    public get asyncTag(): boolean {
        return this._asyncTag;
    }

    public get functionTag(): boolean {
        return this._functionTag;
    }

    public get throwsTag(): Set<string> {
        return this._throwsTag;
    }

    public get paramsTag(): string[][] {
        return this._paramsTag;
    }

    public get returnsTag(): string {
        return this._returnsTag;
    }

    public get staticTag(): boolean {
        return this._staticTag;
    }

    public buildJSDoc(): string {
        let jsdoc = "/**"
        this._nameTag && (jsdoc += `\n * @name ${this._nameTag}`)
        this._functionTag && (jsdoc += `\n * @function`)
        this._accessTag && (jsdoc += `\n * @access ${this._accessTag}`)
        this._staticTag && (jsdoc += `\n * @static`)
        if (this._paramsTag && this._paramsTag.length > 0) {
            this._paramsTag.forEach(item => {
                jsdoc += `\n * @param {${item[1]}} ${item[0]}`
            })
        }
        if (this._throwsTag && this._throwsTag.size > 0) {
            this._throwsTag.forEach(item => {
                jsdoc += `\n * @throws {${item}}`
            })
        }
        this._returnsTag && (jsdoc += `\n * @returns {${this._returnsTag}}`)
        jsdoc += '\n */'
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
        let jsdoc = "/**"
        this._nameTag && (jsdoc += `\n * @name ${this._nameTag}`)
        this._typeTag && (jsdoc += `\n * @type {${this._typeTag}}`)
        this._accessTag && (jsdoc += `\n * @access ${this._accessTag}`)
        this._staticTag && (jsdoc += `\n * @static`)
        this._defaultTag && (jsdoc += `\n * @default ${this._defaultTag}`)
        jsdoc += '\n */'
        return jsdoc
    }
}