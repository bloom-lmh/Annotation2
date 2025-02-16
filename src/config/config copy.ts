
/**
 * 基础注解配置
 */
export class BaseAnnotationConfig {
  public isAuthorTag: boolean;  // 是否包含作者信息
  public isAccessTag: boolean;  // 是否包含访问控制
  public isAliasTag: boolean;  // 是否包含别名
  public isVersionTag: boolean;  // 是否包含版本
  public isNameTag: boolean;  // 是否包含名称
  public isDescriptionTag: boolean;  // 是否包含描述
  public isLicenseTag: boolean;  // 是否包含许可证
  public isCopyrightTag: boolean;  // 是否包含版权
  public isSeeTag: boolean;  // 是否包含 See 参考
  public isSummaryTag: boolean;  // 是否包含摘要
  public isExampleTag: boolean;  // 是否包含示例

  constructor(projectConfig: Partial<BaseAnnotationConfig> = {}) {
    // 解构项目配置
    const { isAuthorTag, isAccessTag, isAliasTag, isVersionTag, isNameTag, isDescriptionTag, isLicenseTag, isCopyrightTag, isSeeTag, isSummaryTag, isExampleTag } = projectConfig
    // 设置属性，有则采用项目配置否则则采用默认值
    this.isAuthorTag = isAuthorTag ?? false;
    this.isAccessTag = isAccessTag ?? true;
    this.isAliasTag = isAliasTag ?? false;
    this.isVersionTag = isVersionTag ?? false;
    this.isNameTag = isNameTag ?? true;
    this.isDescriptionTag = isDescriptionTag ?? true;
    this.isLicenseTag = isLicenseTag ?? false;
    this.isCopyrightTag = isCopyrightTag ?? false;
    this.isSeeTag = isSeeTag ?? false;
    this.isSummaryTag = isSummaryTag ?? false;
    this.isExampleTag = isExampleTag ?? false;
  }
}
/**
 * 全局描述信息配置
 */
export class GlobalAnnotationConfig {
  public authorInfo: string;
  public versionInfo: string;
  public licenseInfo: string;
  public copyrightInfo: string;

  constructor(projectConfig: Partial<GlobalAnnotationConfig> = {}) {
    // 解构项目配置
    const { authorInfo, versionInfo, licenseInfo, copyrightInfo } = projectConfig;
    // 设置属性，有则采用项目配置否则则采用默认值
    this.authorInfo = authorInfo ?? '<作者名字> [<电子邮件地址>]';
    this.versionInfo = versionInfo ?? '1.0.0';
    this.licenseInfo = licenseInfo ?? 'MIT';
    this.copyrightInfo = copyrightInfo ?? '<年份> <版权所有者>';
  }
}
/**
 * 类注解配置
 */
export class ClassAnnotationConfig extends BaseAnnotationConfig {
  public isClassTag: boolean;  // 是否是类
  public isAbstractTag: boolean;  // 是否是抽象类
  public isExtendsTag: boolean;  // 是否继承
  public isImplementsTag: boolean;  // 是否实现接口

  constructor(projectConfig: Partial<ClassAnnotationConfig> = {}) {
    super(projectConfig);
    // 解构配置并设置默认值
    const { isClassTag, isAbstractTag, isExtendsTag, isImplementsTag } = projectConfig;
    this.isClassTag = isClassTag ?? true;
    this.isAbstractTag = isAbstractTag ?? true;
    this.isExtendsTag = isExtendsTag ?? true;
    this.isImplementsTag = isImplementsTag ?? true;
  }
}

/**
 * 方法注解配置
 */
export class MethodAnnotationConfig extends BaseAnnotationConfig {
  public isAsyncTag: boolean;  // 是否异步
  public isFunctionTag: boolean;  // 是否是函数
  public isConstructorTag: boolean;  // 是否是构造函数
  public isThrowsTag: boolean;  // 是否包含抛出异常
  public isParamsTag: boolean;  // 是否包含参数
  public isReturnsTag: boolean;  // 是否包含返回值
  public isStaticTag: boolean;  // 是否是静态方法

  constructor(projectConfig: Partial<MethodAnnotationConfig> = {}) {
    super(projectConfig);
    // 解构配置并设置默认值
    const { isAsyncTag, isFunctionTag, isThrowsTag, isParamsTag, isReturnsTag, isStaticTag, isConstructorTag } = projectConfig;
    this.isAsyncTag = isAsyncTag ?? true;
    this.isFunctionTag = isFunctionTag ?? true;
    this.isConstructorTag = isConstructorTag ?? true;
    this.isThrowsTag = isThrowsTag ?? true;
    this.isParamsTag = isParamsTag ?? true;
    this.isReturnsTag = isReturnsTag ?? true;
    this.isStaticTag = isStaticTag ?? true;
  }
}
/**
 * 属性注解配置
 */
export class PropertyAnnotationConfig extends BaseAnnotationConfig {
  public isPropertyTag: boolean;  // 是否是属性
  public isStaticTag: boolean;  // 是否是静态属性
  public isTypeTag: boolean;  // 是否包含类型
  public isDefaultTag: boolean;  // 是否包含默认值

  constructor(projectConfig: Partial<PropertyAnnotationConfig> = {}) {
    super(projectConfig);
    // 解构配置并设置默认值
    const { isPropertyTag, isStaticTag, isTypeTag, isDefaultTag } = projectConfig;
    this.isPropertyTag = isPropertyTag ?? true;
    this.isStaticTag = isStaticTag ?? true;
    this.isTypeTag = isTypeTag ?? true;
    this.isDefaultTag = isDefaultTag ?? true;
  }
}
/**
 * 接口类型配置
 */
export class InterfaceAnnotationConfig extends BaseAnnotationConfig {
  public isInterfaceTag: boolean;  // 是否是接口
  public isExtendsTag: boolean;  // 是否继承

  constructor(projectConfig: Partial<InterfaceAnnotationConfig> = {}) {
    super(projectConfig);
    // 解构项目配置
    const { isInterfaceTag, isExtendsTag } = projectConfig
    // 设置属性，有则采用项目配置否则则采用默认值
    this.isInterfaceTag = isInterfaceTag ?? true;
    this.isExtendsTag = isExtendsTag ?? true;
  }
}
/**
 * 枚举类型配置
 */
export class EnumAnnotationConfig extends BaseAnnotationConfig {
  public isEnumTag: boolean;  // 是否是枚举类型

  constructor(projectConfig: Partial<EnumAnnotationConfig> = {}) {
    super(projectConfig);
    // 解构配置并设置默认值
    const { isEnumTag } = projectConfig;
    // 设置属性，有则采用项目配置否则则采用默认值
    this.isEnumTag = isEnumTag ?? true;  // 默认为 true
  }
}
/**
 * 自定义类型配置
 */
export class TypedefAnnotationConfig extends BaseAnnotationConfig {
  public isTypedefTag: boolean;  // 是否是自定义类型
  public isTypeTag: boolean;  // 是否是类型

  constructor(projectConfig: Partial<TypedefAnnotationConfig> = {}) {
    super(projectConfig);
    // 解构项目配置
    const { isTypedefTag, isTypeTag } = projectConfig
    // 设置属性，有则采用项目配置否则则采用默认值
    this.isTypedefTag = isTypedefTag ?? true;
    this.isTypeTag = isTypeTag ?? true;
  }
}
/**
 * 文件注释类
 */
export class FileAnnotationConfig extends BaseAnnotationConfig {
  public isFileTag: boolean;  // 是否是文件
  public isModuleTag: boolean;  // 是否是模块

  constructor(projectConfig: Partial<FileAnnotationConfig> = {}) {
    super(projectConfig);
    // 解构配置并设置默认值
    const { isFileTag, isModuleTag } = projectConfig;
    this.isFileTag = isFileTag ?? false;
    this.isModuleTag = isModuleTag ?? false;
  }
}
/**
 * 翻译配置
 */
export class TranslateConfig {
  public isOpen: boolean;
  public api: Array<string> | string;
  public wordMap: { [key: string]: string };
  public isMemoryEnabled: boolean;

  constructor(translateConfig: Partial<TranslateConfig> = {}) {
    // 解构翻译配置
    const { isOpen, api, wordMap, isMemoryEnabled } = translateConfig
    // 设置属性，没有则采用默认值
    this.isOpen = isOpen ?? false;
    this.api = api ?? "";
    this.wordMap = wordMap ?? {};
    this.isMemoryEnabled = isMemoryEnabled ?? false;
  }
}
/**
 * 系统配置
 */
export class SystemConfig {
  // 
  constructor(projectConfig: Partial<SystemConfig> = {}) { }
}

/**
 * 主配置类
 */
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
