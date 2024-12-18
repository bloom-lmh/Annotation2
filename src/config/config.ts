/**
 * 翻译配置
 */
export class TranslateConfig {
    public open: boolean;
    public api: Array<string> | string;
    public wordMap: { [key: string]: string };
    public memory: boolean;
    constructor(config: Partial<TranslateConfig> = {}) {
        this.open = config.open ?? false;
        this.api = config.api ?? "";
        this.wordMap = config.wordMap ?? {};
        this.memory = config.memory ?? false;
    }
}

/**
 * 模式配置
 */
export class ModeConfig {
    // 这里可以添加更多配置
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
    authorTag: boolean
    accessTag: boolean
    aliasTag: boolean
    versionTag: boolean
    nameTag: boolean
    descriptionTag: boolean
    licenseTag: boolean
    copyrightTag: boolean
    tutorialTag: boolean
    seeTag: boolean
    summaryTag: boolean
    exampleTag: boolean
    requiresTag: boolean
    privateTag: boolean
    protectedTag: boolean
    publicTag: boolean

    constructor(config: Partial<BaseAnnotationConfig> = {}) {

    }
}

/**
 * 类注解配置
 */
export class ClassAnnotationConfig extends BaseAnnotationConfig {
    classTag: boolean
    abstract: boolean
    extendsTag: boolean
    implementsTag: boolean

    constructor(config: Partial<ClassAnnotationConfig> = {}) {

    }
}

/**
 * 方法注解配置
 */
export class MethodAnnotationConfig extends BaseAnnotationConfig {
    asyncTag: boolean
    functionTag: boolean
    throwsTag: boolean
    paramsTag: boolean
    returnsTag: boolean
    staticTag: boolean

    constructor(config: Partial<MethodAnnotationConfig> = {}) {

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

    }
}

/**
 * 主配置类
 */
export class Config {
    classAnnotationConfig?: ClassAnnotationConfig;
    methodAnnotationConfig?: MethodAnnotationConfig;
    propertyAnnotationConfig?: PropertyAnnotationConfig;
    globalAnnotationConfig?: GlobalAnnotationConfig;
    translateConfig?: TranslateConfig;

    constructor(config: {
        classAnnotationConfig?: Partial<ClassAnnotationConfig>;
        methodAnnotationConfig?: Partial<MethodAnnotationConfig>;
        propertyAnnotationConfig?: Partial<PropertyAnnotationConfig>;
        globalAnnotationConfig?: Partial<GlobalAnnotationConfig>;
        translateConfig?: Partial<TranslateConfig>;
    } = {}) {
        this.classAnnotationConfig = new ClassAnnotationConfig(config.classAnnotationConfig);
        this.methodAnnotationConfig = new MethodAnnotationConfig(config.methodAnnotationConfig);
        this.propertyAnnotationConfig = new PropertyAnnotationConfig(config.propertyAnnotationConfig);
        this.globalAnnotationConfig = new GlobalAnnotationConfig(config.globalAnnotationConfig);
        this.translateConfig = new TranslateConfig(config.translateConfig);
    }
}

