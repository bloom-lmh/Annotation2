import { BaseAnnotationConfig, ClassAnnotationConfig, EnumAnnotationConfig, FileAnnotationConfig, GlobalAnnotationConfig, InterfaceAnnotationConfig, MethodAnnotationConfig, PropertyAnnotationConfig, TypedefAnnotationConfig } from "../config/config"
import { JSDocGenerator } from "../generator/jsDocGenerator"
import { ClassMember, EnumMember, InterfaceMember, Member, MethodMember, PropertyMember, TypedefMember } from "../parser/member"

/**
 * 全体注解公共标签
 */
export class BaseAnnotation<T extends BaseAnnotationConfig> {
  protected startLineNumber: number = 0
  protected _authorTag: string = ""
  protected _accessTag: string = ""
  protected _aliasTag: boolean = false
  protected _versionTag: string = ""
  protected _nameTag: string = ""
  protected _descriptionTag: boolean = true
  protected _licenseTag: string = ""
  protected _copyrightTag: string = ""
  protected _seeTag: boolean = false
  protected _summaryTag: boolean = false
  protected _exampleTag: boolean = false

  constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: T, member: Member) {
    // 解构全局配置
    const { authorInfo, versionInfo, licenseInfo, copyrightInfo } = globalAnnotationConfig
    // 获取方法配置
    const { isAuthorTag, isAliasTag, isVersionTag, isNameTag, isDescriptionTag, isLicenseTag, isCopyrightTag, isSeeTag, isSummaryTag, isExampleTag } = concreteAnnotationConfig
    // 解构成员信息
    const { name, startLineNumber } = member
    // 成员名
    this._nameTag = isNameTag ? name : ""
    // 作者标签
    this._authorTag = isAuthorTag ? authorInfo : ""
    // 版本标签
    this._versionTag = isVersionTag ? versionInfo : ""
    // 执照标签
    this._licenseTag = isLicenseTag ? licenseInfo : ""
    // 版权标签
    this._copyrightTag = isCopyrightTag ? copyrightInfo : ""
    // 描述信息标签
    this._descriptionTag = isDescriptionTag
    // 别名标签
    this._aliasTag = isAliasTag
    // 参考标签
    this._seeTag = isSeeTag
    // 总结标签
    this._summaryTag = isSummaryTag
    // 案例标签
    this._exampleTag = isExampleTag
    // 开始行号
    this.startLineNumber = startLineNumber
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

  setDescriptionTag(tag: boolean): this {
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
  getStartLineNumber() {
    return this.startLineNumber
  }
  public buildJSDoc(): string {
    let jsdoc = new JSDocGenerator()
      .setAuthorTag(this._authorTag)
      .setAliasTag(this._aliasTag)
      .setVersionTag(this._versionTag)
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
  private _abstractTag: boolean = false;
  private _extendsTag: string = "";
  private _implementsTag: Array<string> = []

  constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: ClassAnnotationConfig, member: ClassMember) {
    // 初始化公共配置
    super(globalAnnotationConfig, concreteAnnotationConfig, member)
    // 解构配置
    const { isAbstractTag, isExtendsTag, isImplementsTag } = concreteAnnotationConfig
    // 解构拾取的成员信息
    const { abstract, extends: _extends, implements: _implements } = member
    // 获取抽象标志
    this._abstractTag = isAbstractTag ? abstract : false
    // 获取继承的类名
    this._extendsTag = isExtendsTag ? _extends : ""
    // 获取实现的接口
    this._implementsTag = isImplementsTag ? _implements : []
  }

  setClassTag(value: boolean): this {
    this._classTag = value;
    return this;
  }

  setAbstract(value: boolean): this {
    this._abstractTag = value;
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
      .setNameTag(this._nameTag)
      .setAbstract(this._abstractTag)
      .setClassTag(this._classTag)
      .setImplementsTag(this._implementsTag)
      .setExtendsTag(this._extendsTag)
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
  private _constructorTag: boolean = false
  private _throwsTag: Set<string> = new Set<string>;
  private _paramsTag: string[][] = [[]];
  private _returnsTag: string = "";
  private _staticTag: boolean = true;

  constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: MethodAnnotationConfig, member: MethodMember) {
    // 初始化公共配置
    super(globalAnnotationConfig, concreteAnnotationConfig, member)
    // 解构配置
    const { isParamsTag, isReturnsTag, isThrowsTag, isAsyncTag, isFunctionTag, isAccessTag, isStaticTag, isConstructorTag } = concreteAnnotationConfig
    // 解构成员信息
    const { async, throws, params, returns, static: _static, access, _constructor, function: _function } = member
    // 方法标签
    this._functionTag = isFunctionTag && _function
    // 构造器标签
    this._constructorTag = isConstructorTag && _constructor
    // 获取方法参数
    this._paramsTag = isParamsTag ? params : []
    // 获取方法返回值
    this._returnsTag = isReturnsTag ? returns : ""
    // 获取方法抛出异常
    this._throwsTag = isThrowsTag ? throws : new Set<string>
    // 获取方法是否异步
    this._asyncTag = isAsyncTag ? async : false
    // 获取方法访问控制信息
    this._accessTag = isAccessTag ? access : ""
    // 是否静态
    this._staticTag = isStaticTag ? _static : false
  }

  setAsyncTag(value: boolean): this {
    this._asyncTag = value;
    return this;
  }

  setFunctionTag(value: boolean): this {
    this._functionTag = value;
    return this;
  }
  setConstructorTag(value: boolean): this {
    this._constructorTag = value;
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
      .setNameTag(this._nameTag)
      .setFunctionTag(this._functionTag)
      .setConstructorTag(this._constructorTag)
      .setAccessTag(this._accessTag)
      .setStaticTag(this._staticTag)
      .setAsyncTag(this._asyncTag)
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
    // 初始化公共配置
    super(globalAnnotationConfig, concreteAnnotationConfig, member)
    // 解构配置
    const { isTypeTag, isDefaultTag, isStaticTag, isAccessTag } = concreteAnnotationConfig
    // 解构成员信息
    const { type, static: _static, default: _default, access } = member
    // 获取属性参数
    this._typeTag = isTypeTag ? type : ""
    // 获取默认值
    this._defaultTag = isDefaultTag ? _default || "" : ""
    // 获取访问权限修饰符
    this._accessTag = isAccessTag ? access : ""
    // 获取是否静态变量
    this._staticTag = isStaticTag ? _static : false
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
      .setNameTag(this._nameTag)
      .setTypeTag(this._typeTag)
      .setAccessTag(this._accessTag)
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
  private _extendsTag: string[] = []

  constructor(globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: InterfaceAnnotationConfig, member: InterfaceMember) {
    // 初始化公共配置
    super(globalAnnotationConfig, concreteAnnotationConfig, member)
    // 解构配置
    const { isInterfaceTag } = concreteAnnotationConfig
    // 解构成员信息
    const { extends: _extends } = member
    // 设置属性
    this._interfaceTag = isInterfaceTag
    this._extendsTag = _extends
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
      .setNameTag(this._nameTag)
      .setInterfaceTag(this._interfaceTag)
      .setExtendsTag(this._extendsTag)
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
    // 初始化公共配置
    super(globalAnnotationConfig, concreteAnnotationConfig, member)
    // 解构配置
    const { isEnumTag } = concreteAnnotationConfig
    // 解构成员信息
    const { enum: _enum, enumMembers } = member
    // 设置属性
    this._enumTag = isEnumTag
    this._enumMembersTag = enumMembers
  }

  setEnumTag(value: boolean): this {
    this._enumTag = value;
    return this;
  }

  public buildJSDoc(): string {
    let other = super.buildJSDoc()
    let jsdoc = new JSDocGenerator()
      .setNameTag(this._nameTag)
      .setEnumTag(this._enumTag)
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
    // 初始化公共配置
    super(globalAnnotationConfig, concreteAnnotationConfig, member)
    // 结构配置
    const { isTypeTag, isTypedefTag } = concreteAnnotationConfig
    // 解构成员信息
    const { type } = member
    // 设置属性
    this._typedefTag = isTypedefTag
    this._typeTag = isTypeTag ? type : ""

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
      .setNameTag(this._nameTag)
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
      .setNameTag(this._nameTag)
      .setFileTag(this._fileTag)
      .setModuleTag(this._moduleTag)
      .union(other)
      .build()
    return jsdoc
  }
}


