import { IClassAnnotationConfig, IEnumAnnotationConfig, IFileAnnotationConfig, IGlobalAnnotationConfig, IInterfaceAnnotationConfig, IMethodAnnotationConfig, IPropertyAnnotationConfig, ISystemConfig, ITranslateConfig, ITypedefAnnotationConfig } from './configType'

// ClassAnnotationConfigClass 类
export class ClassAnnotationConfig implements IClassAnnotationConfig {
  isClassTag: boolean;
  isAbstractTag: boolean;
  isExtendsTag: boolean;
  isImplementsTag: boolean;
  isAuthorTag: boolean;
  isAliasTag: boolean;
  isVersionTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;
  isTemplateTag: boolean;

  // 构造器内部解构配置
  constructor(config: Partial<IClassAnnotationConfig> = {}) {
    const {
      isClassTag = true,
      isAbstractTag = true,
      isExtendsTag = true,
      isImplementsTag = true,
      isAuthorTag = false,
      isAliasTag = false,
      isVersionTag = false,
      isNameTag = true,
      isDescriptionTag = true,
      isSeeTag = false,
      isExampleTag = false,
      isTemplateTag = true,
    } = config;

    // 使用解构后的值进行赋值
    this.isClassTag = isClassTag;
    this.isAbstractTag = isAbstractTag;
    this.isExtendsTag = isExtendsTag;
    this.isImplementsTag = isImplementsTag;
    this.isAuthorTag = isAuthorTag;
    this.isAliasTag = isAliasTag;
    this.isVersionTag = isVersionTag;
    this.isNameTag = isNameTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
    this.isExampleTag = isExampleTag;
    this.isTemplateTag = isTemplateTag;
  }

  // 链式编程的 set 方法
  setClassTag(value: boolean): this {
    this.isClassTag = value;
    return this;
  }

  setAbstractTag(value: boolean): this {
    this.isAbstractTag = value;
    return this;
  }

  setExtendsTag(value: boolean): this {
    this.isExtendsTag = value;
    return this;
  }

  setImplementsTag(value: boolean): this {
    this.isImplementsTag = value;
    return this;
  }

  setAuthorTag(value: boolean): this {
    this.isAuthorTag = value;
    return this;
  }

  setAliasTag(value: boolean): this {
    this.isAliasTag = value;
    return this;
  }

  setVersionTag(value: boolean): this {
    this.isVersionTag = value;
    return this;
  }

  setNameTag(value: boolean): this {
    this.isNameTag = value;
    return this;
  }

  setDescriptionTag(value: boolean): this {
    this.isDescriptionTag = value;
    return this;
  }

  setSeeTag(value: boolean): this {
    this.isSeeTag = value;
    return this;
  }

  setExampleTag(value: boolean): this {
    this.isExampleTag = value;
    return this;
  }

  setTemplateTag(value: boolean): this {
    this.isTemplateTag = value;
    return this;
  }
}
export class MethodAnnotationConfig implements IMethodAnnotationConfig {
  isAsyncTag: boolean;
  isFunctionTag: boolean;
  isConstructorTag: boolean;
  isThrowsTag: boolean;
  isParamsTag: boolean;
  isReturnsTag: boolean;
  isStaticTag: boolean;
  isAccessTag: boolean;
  isAuthorTag: boolean;
  isAliasTag: boolean;
  isVersionTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;
  isTemplateTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<IMethodAnnotationConfig> = {}) {
    const {
      isAsyncTag = true,
      isFunctionTag = true,
      isConstructorTag = true,
      isThrowsTag = true,
      isParamsTag = true,
      isReturnsTag = true,
      isStaticTag = true,
      isAccessTag = true,
      isAuthorTag = false,
      isAliasTag = false,
      isVersionTag = false,
      isNameTag = true,
      isDescriptionTag = true,
      isSeeTag = false,
      isExampleTag = false,
      isTemplateTag = true,
    } = config;

    // 使用解构后的值进行赋值
    this.isAsyncTag = isAsyncTag;
    this.isFunctionTag = isFunctionTag;
    this.isConstructorTag = isConstructorTag;
    this.isThrowsTag = isThrowsTag;
    this.isParamsTag = isParamsTag;
    this.isReturnsTag = isReturnsTag;
    this.isStaticTag = isStaticTag;
    this.isAccessTag = isAccessTag;
    this.isAuthorTag = isAuthorTag;
    this.isAliasTag = isAliasTag;
    this.isVersionTag = isVersionTag;
    this.isNameTag = isNameTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
    this.isExampleTag = isExampleTag;
    this.isTemplateTag = isTemplateTag;
  }

  // 链式编程的 set 方法
  setAsyncTag(value: boolean): this {
    this.isAsyncTag = value;
    return this;
  }

  setFunctionTag(value: boolean): this {
    this.isFunctionTag = value;
    return this;
  }

  setConstructorTag(value: boolean): this {
    this.isConstructorTag = value;
    return this;
  }

  setThrowsTag(value: boolean): this {
    this.isThrowsTag = value;
    return this;
  }

  setParamsTag(value: boolean): this {
    this.isParamsTag = value;
    return this;
  }

  setReturnsTag(value: boolean): this {
    this.isReturnsTag = value;
    return this;
  }

  setStaticTag(value: boolean): this {
    this.isStaticTag = value;
    return this;
  }

  setAccessTag(value: boolean): this {
    this.isAccessTag = value;
    return this;
  }

  setAuthorTag(value: boolean): this {
    this.isAuthorTag = value;
    return this;
  }

  setAliasTag(value: boolean): this {
    this.isAliasTag = value;
    return this;
  }

  setVersionTag(value: boolean): this {
    this.isVersionTag = value;
    return this;
  }

  setNameTag(value: boolean): this {
    this.isNameTag = value;
    return this;
  }

  setDescriptionTag(value: boolean): this {
    this.isDescriptionTag = value;
    return this;
  }

  setSeeTag(value: boolean): this {
    this.isSeeTag = value;
    return this;
  }

  setExampleTag(value: boolean): this {
    this.isExampleTag = value;
    return this;
  }

  setTemplateTag(value: boolean): this {
    this.isTemplateTag = value;
    return this;
  }
}


export class PropertyAnnotationConfig implements IPropertyAnnotationConfig {
  isPropertyTag: boolean;
  isStaticTag: boolean;
  isTypeTag: boolean;
  isDefaultTag: boolean;
  isAliasTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;
  isTemplateTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<IPropertyAnnotationConfig> = {}) {
    const {
      isPropertyTag = true,
      isStaticTag = true,
      isTypeTag = true,
      isDefaultTag = true,
      isAliasTag = true,
      isNameTag = true,
      isDescriptionTag = true,
      isSeeTag = false,
      isExampleTag = false,
      isTemplateTag = true,
    } = config;

    // 使用解构后的值进行赋值
    this.isPropertyTag = isPropertyTag;
    this.isStaticTag = isStaticTag;
    this.isTypeTag = isTypeTag;
    this.isDefaultTag = isDefaultTag;
    this.isAliasTag = isAliasTag;
    this.isNameTag = isNameTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
    this.isExampleTag = isExampleTag;
    this.isTemplateTag = isTemplateTag;
  }

  // 链式编程的 set 方法
  setPropertyTag(value: boolean): this {
    this.isPropertyTag = value;
    return this;
  }

  setStaticTag(value: boolean): this {
    this.isStaticTag = value;
    return this;
  }

  setTypeTag(value: boolean): this {
    this.isTypeTag = value;
    return this;
  }

  setDefaultTag(value: boolean): this {
    this.isDefaultTag = value;
    return this;
  }

  setAliasTag(value: boolean): this {
    this.isAliasTag = value;
    return this;
  }

  setNameTag(value: boolean): this {
    this.isNameTag = value;
    return this;
  }

  setDescriptionTag(value: boolean): this {
    this.isDescriptionTag = value;
    return this;
  }

  setSeeTag(value: boolean): this {
    this.isSeeTag = value;
    return this;
  }

  setExampleTag(value: boolean): this {
    this.isExampleTag = value;
    return this;
  }

  setTemplateTag(value: boolean): this {
    this.isTemplateTag = value;
    return this;
  }
}

export class EnumAnnotationConfig implements IEnumAnnotationConfig {
  isEnumTag: boolean;
  isAliasTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<IEnumAnnotationConfig> = {}) {
    const {
      isEnumTag = true,
      isAliasTag = false,
      isNameTag = true,
      isDescriptionTag = true,
      isSeeTag = false,
      isExampleTag = false,
    } = config;

    // 使用解构后的值进行赋值
    this.isEnumTag = isEnumTag;
    this.isAliasTag = isAliasTag;
    this.isNameTag = isNameTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
    this.isExampleTag = isExampleTag;
  }

  // 链式编程的 set 方法
  setEnumTag(value: boolean): this {
    this.isEnumTag = value;
    return this;
  }

  setAliasTag(value: boolean): this {
    this.isAliasTag = value;
    return this;
  }

  setNameTag(value: boolean): this {
    this.isNameTag = value;
    return this;
  }

  setDescriptionTag(value: boolean): this {
    this.isDescriptionTag = value;
    return this;
  }

  setSeeTag(value: boolean): this {
    this.isSeeTag = value;
    return this;
  }

  setExampleTag(value: boolean): this {
    this.isExampleTag = value;
    return this;
  }


}

export class TypedefAnnotationConfig implements ITypedefAnnotationConfig {
  isTypedefTag: boolean;
  isTypeTag: boolean;
  isAliasTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<ITypedefAnnotationConfig> = {}) {
    const {
      isTypedefTag = true,
      isTypeTag = true,
      isAliasTag = true,
      isNameTag = true,
      isDescriptionTag = true,
      isSeeTag = true,
      isExampleTag = true,
    } = config;

    // 使用解构后的值进行赋值
    this.isTypedefTag = isTypedefTag;
    this.isTypeTag = isTypeTag;
    this.isAliasTag = isAliasTag;
    this.isNameTag = isNameTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
    this.isExampleTag = isExampleTag;
  }

  // 链式编程的 set 方法
  setTypedefTag(value: boolean): this {
    this.isTypedefTag = value;
    return this;
  }

  setTypeTag(value: boolean): this {
    this.isTypeTag = value;
    return this;
  }

  setAliasTag(value: boolean): this {
    this.isAliasTag = value;
    return this;
  }

  setNameTag(value: boolean): this {
    this.isNameTag = value;
    return this;
  }

  setDescriptionTag(value: boolean): this {
    this.isDescriptionTag = value;
    return this;
  }

  setSeeTag(value: boolean): this {
    this.isSeeTag = value;
    return this;
  }

  setExampleTag(value: boolean): this {
    this.isExampleTag = value;
    return this;
  }
}
export class InterfaceAnnotationConfig implements IInterfaceAnnotationConfig {
  isInterfaceTag: boolean;
  isExtendsTag: boolean;
  isAuthorTag: boolean;
  isVersionTag: boolean;
  isTemplateTag: boolean;
  isAliasTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<IInterfaceAnnotationConfig> = {}) {
    const {
      isInterfaceTag = true,
      isExtendsTag = true,
      isAuthorTag = false,
      isVersionTag = false,
      isTemplateTag = true,
      isAliasTag = false,
      isNameTag = true,
      isDescriptionTag = true,
      isSeeTag = false,
      isExampleTag = false,
    } = config;

    // 使用解构后的值进行赋值
    this.isInterfaceTag = isInterfaceTag;
    this.isExtendsTag = isExtendsTag;
    this.isAuthorTag = isAuthorTag;
    this.isVersionTag = isVersionTag;
    this.isTemplateTag = isTemplateTag;
    this.isAliasTag = isAliasTag;
    this.isNameTag = isNameTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
    this.isExampleTag = isExampleTag;
  }

  // 链式编程的 set 方法
  setInterfaceTag(value: boolean): this {
    this.isInterfaceTag = value;
    return this;
  }

  setExtendsTag(value: boolean): this {
    this.isExtendsTag = value;
    return this;
  }

  setAuthorTag(value: boolean): this {
    this.isAuthorTag = value;
    return this;
  }

  setVersionTag(value: boolean): this {
    this.isVersionTag = value;
    return this;
  }

  setTemplateTag(value: boolean): this {
    this.isTemplateTag = value;
    return this;
  }

  setAliasTag(value: boolean): this {
    this.isAliasTag = value;
    return this;
  }

  setNameTag(value: boolean): this {
    this.isNameTag = value;
    return this;
  }

  setDescriptionTag(value: boolean): this {
    this.isDescriptionTag = value;
    return this;
  }

  setSeeTag(value: boolean): this {
    this.isSeeTag = value;
    return this;
  }

  setExampleTag(value: boolean): this {
    this.isExampleTag = value;
    return this;
  }
}


export class FileAnnotationConfig implements IFileAnnotationConfig {
  isNamespaceTag: boolean;
  isModuleTag: boolean;
  isRequireTag: boolean;
  isFileoverview: boolean;
  isLicenseTag: boolean;
  isCopyrightTag: boolean;
  isAuthorTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<IFileAnnotationConfig> = {}) {
    const {
      isNamespaceTag = false,
      isModuleTag = true,
      isRequireTag = false,
      isFileoverview = true,
      isLicenseTag = true,
      isCopyrightTag = true,
      isAuthorTag = true,
      isDescriptionTag = true,
      isSeeTag = false,
    } = config;

    // 使用解构后的值进行赋值
    this.isNamespaceTag = isNamespaceTag;
    this.isModuleTag = isModuleTag;
    this.isRequireTag = isRequireTag;
    this.isFileoverview = isFileoverview;
    this.isLicenseTag = isLicenseTag;
    this.isCopyrightTag = isCopyrightTag;
    this.isAuthorTag = isAuthorTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
  }

  // 链式编程的 set 方法
  setNamespaceTag(value: boolean): this {
    this.isNamespaceTag = value;
    return this;
  }

  setModuleTag(value: boolean): this {
    this.isModuleTag = value;
    return this;
  }

  setRequireTag(value: boolean): this {
    this.isRequireTag = value;
    return this;
  }

  setFileoverview(value: boolean): this {
    this.isFileoverview = value;
    return this;
  }

  setLicenseTag(value: boolean): this {
    this.isLicenseTag = value;
    return this;
  }

  setCopyrightTag(value: boolean): this {
    this.isCopyrightTag = value;
    return this;
  }

  setAuthorTag(value: boolean): this {
    this.isAuthorTag = value;
    return this;
  }

  setDescriptionTag(value: boolean): this {
    this.isDescriptionTag = value;
    return this;
  }

  setSeeTag(value: boolean): this {
    this.isSeeTag = value;
    return this;
  }
}


export class TranslateConfig implements ITranslateConfig {
  isOpen: boolean;
  api: string | string[] | Map<string, string[]>;
  wordMap: { [key: string]: string };
  isMemoryEnabled: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<ITranslateConfig> = {}) {
    const {
      isOpen = true,
      api = 'http://www.trans-home.com/api/index/translateLogs?token=0zbtxTxstrLwQ9uK2PuR',
      wordMap = {},
      isMemoryEnabled = true,
    } = config;

    // 使用解构后的值进行赋值
    this.isOpen = isOpen;
    this.api = api;
    this.wordMap = wordMap;
    this.isMemoryEnabled = isMemoryEnabled;
  }

  // 链式编程的 set 方法
  setOpen(value: boolean): this {
    this.isOpen = value;
    return this;
  }

  setApi(value: string | string[] | Map<string, string[]>): this {
    this.api = value;
    return this;
  }

  setWordMap(value: { [key: string]: string }): this {
    this.wordMap = value;
    return this;
  }

  setMemoryEnabled(value: boolean): this {
    this.isMemoryEnabled = value;
    return this;
  }
}
enum CreateStrategy {
  REGEXP_STRATEGY = 0,
  AST_STRATEGY,
  MIX_STRATEGY
}
enum CreateMode {
  ADD_MODE = 0,
  DELETE_MODE,
  UPDATE_MODE
}
export class SystemConfig implements ISystemConfig {
  annotationCreateStrategy: number;
  annotationCreateMode: number;
  configCache: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<ISystemConfig> = {}) {
    const {
      annotationCreateStrategy = CreateStrategy.REGEXP_STRATEGY,
      annotationCreateMode = CreateMode.ADD_MODE,
      configCache = true,
    } = config;

    // 使用解构后的值进行赋值
    this.annotationCreateStrategy = annotationCreateStrategy;
    this.annotationCreateMode = annotationCreateMode;
    this.configCache = configCache;
  }

  // 链式编程的 set 方法
  setAnnotationCreateStrategy(value: number): this {
    this.annotationCreateStrategy = value;
    return this;
  }

  setAnnotationCreateMode(value: number): this {
    this.annotationCreateMode = value;
    return this;
  }

  setConfigCache(value: boolean): this {
    this.configCache = value;
    return this;
  }
}

export class GlobalAnnotationConfig implements IGlobalAnnotationConfig {
  authorInfo: string;
  versionInfo: string;
  licenseInfo: string;
  copyrightInfo: string;

  // 构造器使用解构语法
  constructor(config: Partial<IGlobalAnnotationConfig> = {}) {
    const {
      authorInfo = '',
      versionInfo = '',
      licenseInfo = '',
      copyrightInfo = '',
    } = config;

    // 使用解构后的值进行赋值
    this.authorInfo = authorInfo;
    this.versionInfo = versionInfo;
    this.licenseInfo = licenseInfo;
    this.copyrightInfo = copyrightInfo;
  }

  // 链式编程的 set 方法
  setAuthorInfo(value: string): this {
    this.authorInfo = value;
    return this;
  }

  setVersionInfo(value: string): this {
    this.versionInfo = value;
    return this;
  }

  setLicenseInfo(value: string): this {
    this.licenseInfo = value;
    return this;
  }

  setCopyrightInfo(value: string): this {
    this.copyrightInfo = value;
    return this;
  }
}

export class Config {
  public interfaceAnnotationConfig?: InterfaceAnnotationConfig;
  public typedefAnnotationConfig?: TypedefAnnotationConfig;
  public enumAnnotationConfig?: EnumAnnotationConfig;
  public classAnnotationConfig?: ClassAnnotationConfig;
  public methodAnnotationConfig?: MethodAnnotationConfig;
  public propertyAnnotationConfig?: PropertyAnnotationConfig;
  public globalAnnotationConfig?: GlobalAnnotationConfig;
  public fileAnnotationConfig?: FileAnnotationConfig;
  public translateConfig?: TranslateConfig;
  public systemConfig?: SystemConfig;

  constructor(projectConfig: {
    interfaceAnnotationConfig?: Partial<InterfaceAnnotationConfig>;
    typedefAnnotationConfig?: Partial<TypedefAnnotationConfig>;
    enumAnnotationConfig?: Partial<EnumAnnotationConfig>;
    classAnnotationConfig?: Partial<ClassAnnotationConfig>;
    methodAnnotationConfig?: Partial<MethodAnnotationConfig>;
    propertyAnnotationConfig?: Partial<PropertyAnnotationConfig>;
    globalAnnotationConfig?: Partial<GlobalAnnotationConfig>;
    translateConfig?: Partial<TranslateConfig>;
    fileAnnotationConfig?: Partial<FileAnnotationConfig>;
    systemConfig?: Partial<SystemConfig>;
  } = {}) {
    const { interfaceAnnotationConfig, typedefAnnotationConfig, enumAnnotationConfig, classAnnotationConfig
      , methodAnnotationConfig, propertyAnnotationConfig, globalAnnotationConfig, translateConfig, fileAnnotationConfig, systemConfig
    } = projectConfig
    this.interfaceAnnotationConfig = new InterfaceAnnotationConfig(interfaceAnnotationConfig);
    this.typedefAnnotationConfig = new TypedefAnnotationConfig(typedefAnnotationConfig);
    this.enumAnnotationConfig = new EnumAnnotationConfig(enumAnnotationConfig);
    this.classAnnotationConfig = new ClassAnnotationConfig(classAnnotationConfig);
    this.methodAnnotationConfig = new MethodAnnotationConfig(methodAnnotationConfig);
    this.propertyAnnotationConfig = new PropertyAnnotationConfig(propertyAnnotationConfig);
    this.globalAnnotationConfig = new GlobalAnnotationConfig(globalAnnotationConfig);
    this.translateConfig = new TranslateConfig(translateConfig);
    this.fileAnnotationConfig = new FileAnnotationConfig(fileAnnotationConfig);
    this.systemConfig = new SystemConfig(systemConfig);
  }
}
