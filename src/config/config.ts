/**
 * 翻译配置
 */
export class TranslateConfig {
    open: boolean;
    api: Array<string> | string;
    wordMap: { [key: string]: string };
    memory: boolean;
    constructor(config: Partial<TranslateConfig> = {}) {
        this.open = config.open ?? false;
        this.api = config.api ?? "";
        this.wordMap = config.wordMap ?? {};
        this.memory = config.memory ?? false;
    }
}

/**
 * 全局描述信息配置
 */
export class GlobalAnnotationConfig {
    author: string;
    version: string;
    description: string;

    constructor(config: Partial<GlobalAnnotationConfig> = {}) {
        this.author = config.author ?? '';
        this.version = config.version ?? '';
        this.description = config.description ?? '';
    }
}
/**
 * 基础注解配置
 */
export class BaseAnnotationConfig {
    authorTag: boolean;
    accessTag: boolean;
    aliasTag: boolean;
    versionTag: boolean;
    nameTag: boolean;
    descriptionTag: boolean;
    licenseTag: boolean;
    copyrightTag: boolean;
    tutorialTag: boolean;
    seeTag: boolean;
    summaryTag: boolean;
    exampleTag: boolean;
    requiresTag: boolean;

    constructor(config: Partial<BaseAnnotationConfig> = {}) {
        this.authorTag = config.authorTag ?? false;
        this.accessTag = config.accessTag ?? false;
        this.aliasTag = config.aliasTag ?? false;
        this.versionTag = config.versionTag ?? false;
        this.nameTag = config.nameTag ?? false;
        this.descriptionTag = config.descriptionTag ?? false;
        this.licenseTag = config.licenseTag ?? false;
        this.copyrightTag = config.copyrightTag ?? false;
        this.tutorialTag = config.tutorialTag ?? false;
        this.seeTag = config.seeTag ?? false;
        this.summaryTag = config.summaryTag ?? false;
        this.exampleTag = config.exampleTag ?? false;
        this.requiresTag = config.requiresTag ?? false;
    }
}
/**
 * 接口类型配置
 */
export class InterfaceConfig extends BaseAnnotationConfig {
    interfaceTag: boolean;
    constructor(config: Partial<InterfaceConfig> = {}) {
        super(config);
        this.interfaceTag = config.interfaceTag ?? false;
    }
}
/**
 * 自定义类型配置
 */
export class TypedefConfig extends BaseAnnotationConfig {
    typedefTag: boolean;
    typeTag: boolean;
    constructor(config: Partial<TypedefConfig> = {}) {
        super(config);
        this.typedefTag = config.typedefTag ?? false;
        this.typeTag = config.typeTag ?? false;
    }
}
/**
 * 枚举类型配置
 */
export class EnumConfig extends BaseAnnotationConfig {
    enumTag: boolean;
    constructor(config: Partial<EnumConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.enumTag = config.enumTag ?? false;
    }
}
/**
 * 类注解配置
 */
export class ClassAnnotationConfig extends BaseAnnotationConfig {
    classTag: boolean;
    abstract: boolean;
    extendsTag: boolean;
    implementsTag: boolean;

    constructor(config: Partial<ClassAnnotationConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.classTag = config.classTag ?? false;
        this.abstract = config.abstract ?? false;
        this.extendsTag = config.extendsTag ?? false;
        this.implementsTag = config.implementsTag ?? false;
    }
}

/**
 * 方法注解配置
 */
export class MethodAnnotationConfig extends BaseAnnotationConfig {
    asyncTag: boolean;
    functionTag: boolean;
    throwsTag: boolean;
    paramsTag: boolean;
    returnsTag: boolean;
    staticTag: boolean;

    constructor(config: Partial<MethodAnnotationConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.asyncTag = config.asyncTag ?? false;
        this.functionTag = config.functionTag ?? false;
        this.throwsTag = config.throwsTag ?? false;
        this.paramsTag = config.paramsTag ?? false;
        this.returnsTag = config.returnsTag ?? false;
        this.staticTag = config.staticTag ?? false;
    }
}

/**
 * 属性注解配置
 */
export class PropertyAnnotationConfig extends BaseAnnotationConfig {
    property: boolean;
    static: boolean;
    type: boolean;
    default: boolean;

    constructor(config: Partial<PropertyAnnotationConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.property = config.property ?? false;
        this.static = config.static ?? false;
        this.type = config.type ?? false;
        this.default = config.default ?? false;
    }
}

/**
 * 系统配置
 */
export class SystemConfig {
    constructor(config: Partial<SystemConfig> = {}) {

    }
}
/**
 * 文件注释类
 */
export class FileAnnotationConfig extends BaseAnnotationConfig {
    fileTag: boolean;
    moduleTag: boolean;

    constructor(config: Partial<FileAnnotationConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.fileTag = config.fileTag ?? false;
        this.moduleTag = config.moduleTag ?? false;
    }
}
/**
 * 主配置类
 */
export class Config {
    interfaceConfig?: InterfaceConfig
    typedefConfig?: TypedefConfig
    enumConfig?: EnumConfig
    classAnnotationConfig?: ClassAnnotationConfig;
    methodAnnotationConfig?: MethodAnnotationConfig;
    propertyAnnotationConfig?: PropertyAnnotationConfig;
    globalAnnotationConfig?: GlobalAnnotationConfig;
    fileAnnotationConfig?: FileAnnotationConfig
    translateConfig?: TranslateConfig;
    systemConfig?: SystemConfig

    constructor(config: {
        interfaceConfig?: Partial<InterfaceConfig>
        typedefConfig?: Partial<TypedefConfig>
        enumConfig?: Partial<EnumConfig>
        classAnnotationConfig?: Partial<ClassAnnotationConfig>;
        methodAnnotationConfig?: Partial<MethodAnnotationConfig>;
        propertyAnnotationConfig?: Partial<PropertyAnnotationConfig>;
        globalAnnotationConfig?: Partial<GlobalAnnotationConfig>;
        translateConfig?: Partial<TranslateConfig>;
        fileAnnotationConfig?: Partial<FileAnnotationConfig>
        systemConfig?: Partial<SystemConfig>
    } = {}) {
        this.interfaceConfig = new InterfaceConfig(config.interfaceConfig)
        this.typedefConfig = new TypedefConfig(config.typedefConfig)
        this.enumConfig = new EnumConfig(config.enumConfig)
        this.classAnnotationConfig = new ClassAnnotationConfig(config.classAnnotationConfig);
        this.methodAnnotationConfig = new MethodAnnotationConfig(config.methodAnnotationConfig);
        this.propertyAnnotationConfig = new PropertyAnnotationConfig(config.propertyAnnotationConfig);
        this.globalAnnotationConfig = new GlobalAnnotationConfig(config.globalAnnotationConfig);
        this.translateConfig = new TranslateConfig(config.translateConfig);
        this.fileAnnotationConfig = new FileAnnotationConfig(config.fileAnnotationConfig)
        this.systemConfig = new SystemConfig(config.systemConfig)
    }
}

