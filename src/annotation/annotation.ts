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
}

/**
 * 自定义类型注解
 */
export class TypedefAnnotation extends BaseAnnotation {
    private _typedefTag: boolean = true;

    setTypedefTag(value: boolean): this {
        this._typedefTag = value;
        return this;
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
}

/**
 * 方法注解模型
 */
export class MethodAnnotation extends BaseAnnotation {
    private _asyncTag: boolean = false;
    private _functionTag: boolean = true;
    private _throwsTag: Array<string> = [];
    private _paramsTag: Array<string> = [];
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

    setThrowsTag(value: Array<string>): this {
        this._throwsTag = value;
        return this;
    }

    setParamsTag(value: Array<string>): this {
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
}

/**
 * 属性注解模型
 */
export class PropertyAnnotation extends BaseAnnotation {
    private _propertyTag: boolean = true;
    private _typeTag: boolean = true;
    private _staticTag: boolean = false;
    private _defaultTag: string = "";

    setPropertyTag(value: boolean): this {
        this._propertyTag = value;
        return this;
    }
    setTypeTag(value: boolean): this {
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
}