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
    license: string;
    copyright: string;

    constructor(config: Partial<GlobalAnnotationConfig> = {}) {
        this.author = config.author ?? '';
        this.version = config.version ?? '';
        this.description = config.description ?? '';
        this.license = config.license ?? '';
        this.copyright = config.copyright ?? '';
    }
}
/**
 * 基础注解配置
 */
export class BaseAnnotationConfig {
    author: boolean;
    access: boolean;
    alias: boolean;
    version: boolean;
    name: boolean;
    description: boolean;
    license: boolean;
    copyright: boolean;
    tutorial: boolean;
    see: boolean;
    summary: boolean;
    example: boolean;

    constructor(config: Partial<BaseAnnotationConfig> = {}) {
        this.author = config.author ?? false;
        this.access = config.access ?? false;
        this.alias = config.alias ?? false;
        this.version = config.version ?? false;
        this.name = config.name ?? false;
        this.description = config.description ?? false;
        this.license = config.license ?? false;
        this.copyright = config.copyright ?? false;
        this.tutorial = config.tutorial ?? false;
        this.see = config.see ?? false;
        this.summary = config.summary ?? false;
        this.example = config.example ?? false;
    }
}
/**
 * 接口类型配置
 */
export class InterfaceAnnotationConfig extends BaseAnnotationConfig {
    interface: boolean;
    constructor(config: Partial<InterfaceAnnotationConfig> = {}) {
        super(config);
        this.interface = config.interface ?? false;
    }
}
/**
 * 自定义类型配置
 */
export class TypedefAnnotationConfig extends BaseAnnotationConfig {
    typedef: boolean;
    type: boolean;
    constructor(config: Partial<TypedefAnnotationConfig> = {}) {
        super(config);
        this.typedef = config.typedef ?? false;
        this.type = config.type ?? false;
    }
}
/**
 * 枚举类型配置
 */
export class EnumAnnotationConfig extends BaseAnnotationConfig {
    enum: boolean;
    constructor(config: Partial<EnumAnnotationConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.enum = config.enum ?? false;
    }
}
/**
 * 类注解配置
 */
export class ClassAnnotationConfig extends BaseAnnotationConfig {
    class: boolean;
    abstract: boolean;
    extends: boolean;
    implements: boolean;

    constructor(config: Partial<ClassAnnotationConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.class = config.class ?? false;
        this.abstract = config.abstract ?? false;
        this.extends = config.extends ?? false;
        this.implements = config.implements ?? false;
    }
}

/**
 * 方法注解配置
 */
export class MethodAnnotationConfig extends BaseAnnotationConfig {
    async: boolean;
    function: boolean;
    throws: boolean;
    params: boolean;
    returns: boolean;
    static: boolean;

    constructor(config: Partial<MethodAnnotationConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.async = config.async ?? false;
        this.function = config.function ?? false;
        this.throws = config.throws ?? false;
        this.params = config.params ?? false;
        this.returns = config.returns ?? false;
        this.static = config.static ?? false;
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
    file: boolean;
    module: boolean;

    constructor(config: Partial<FileAnnotationConfig> = {}) {
        super(config);  // Initialize properties from BaseAnnotationConfig
        this.file = config.file ?? false;
        this.module = config.module ?? false;
    }
}
/**
 * 主配置类
 */
export class Config {
    interfaceAnnotationConfig?: InterfaceAnnotationConfig
    typedefAnnotationConfig?: TypedefAnnotationConfig
    enumAnnotationConfig?: EnumAnnotationConfig
    classAnnotationConfig?: ClassAnnotationConfig;
    methodAnnotationConfig?: MethodAnnotationConfig;
    propertyAnnotationConfig?: PropertyAnnotationConfig;
    globalAnnotationConfig?: GlobalAnnotationConfig;
    fileAnnotationConfig?: FileAnnotationConfig
    translateConfig?: TranslateConfig;
    systemConfig?: SystemConfig

    constructor(config: {
        interfaceAnnotationConfig?: Partial<InterfaceAnnotationConfig>
        typedefAnnotationConfig?: Partial<TypedefAnnotationConfig>
        enumAnnotationConfig?: Partial<EnumAnnotationConfig>
        classAnnotationConfig?: Partial<ClassAnnotationConfig>;
        methodAnnotationConfig?: Partial<MethodAnnotationConfig>;
        propertyAnnotationConfig?: Partial<PropertyAnnotationConfig>;
        globalAnnotationConfig?: Partial<GlobalAnnotationConfig>;
        translateConfig?: Partial<TranslateConfig>;
        fileAnnotationConfig?: Partial<FileAnnotationConfig>
        systemConfig?: Partial<SystemConfig>
    } = {}) {
        this.interfaceAnnotationConfig = new InterfaceAnnotationConfig(config.interfaceAnnotationConfig)
        this.typedefAnnotationConfig = new TypedefAnnotationConfig(config.typedefAnnotationConfig)
        this.enumAnnotationConfig = new EnumAnnotationConfig(config.enumAnnotationConfig)
        this.classAnnotationConfig = new ClassAnnotationConfig(config.classAnnotationConfig);
        this.methodAnnotationConfig = new MethodAnnotationConfig(config.methodAnnotationConfig);
        this.propertyAnnotationConfig = new PropertyAnnotationConfig(config.propertyAnnotationConfig);
        this.globalAnnotationConfig = new GlobalAnnotationConfig(config.globalAnnotationConfig);
        this.translateConfig = new TranslateConfig(config.translateConfig);
        this.fileAnnotationConfig = new FileAnnotationConfig(config.fileAnnotationConfig)
        this.systemConfig = new SystemConfig(config.systemConfig)
    }
}

