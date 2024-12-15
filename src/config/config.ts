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
    name: boolean;
    author: string;
    memberof: boolean;
    example: boolean;
    since: boolean;
    version: boolean;
    see: boolean;
    description: boolean;
    modifier: boolean;

    constructor(config: Partial<BaseAnnotationConfig> = {}) {
        this.name = config.name ?? true;
        this.author = config.author ?? '';
        this.memberof = config.memberof ?? true;
        this.example = config.example ?? false;
        this.since = config.since ?? false;
        this.version = config.version ?? true;
        this.see = config.see ?? false;
        this.description = config.description ?? true;
        this.modifier = config.modifier ?? true;
    }
}

/**
 * 类注解配置
 */
export class ClassAnnotationConfig extends BaseAnnotationConfig {
    class: boolean;
    abstract: boolean;
    isConstructor: boolean;
    interface: boolean;
    extends: boolean;
    implements: boolean;
    params: boolean;
    implement: boolean;
    returns: boolean;

    constructor(config: Partial<ClassAnnotationConfig> = {}) {
        super(config);  // 继承父类的构造函数
        this.class = config.class ?? true;
        this.abstract = config.abstract ?? true;
        this.isConstructor = config.isConstructor ?? true;
        this.interface = config.interface ?? true;
        this.extends = config.extends ?? true;
        this.implements = config.implements ?? true;
        this.params = config.params ?? true;
        this.implement = config.implement ?? true;
        this.returns = config.returns ?? true;
    }
}

/**
 * 方法注解配置
 */
export class MethodAnnotationConfig extends BaseAnnotationConfig {
    method: boolean;
    abstract: boolean;
    async: boolean;
    params: boolean;
    returns: boolean;
    throws: boolean;
    override: boolean;

    constructor(config: Partial<MethodAnnotationConfig> = {}) {
        super(config);
        this.method = config.method ?? true;
        this.abstract = config.abstract ?? true;
        this.async = config.async ?? true;
        this.params = config.params ?? true;
        this.returns = config.returns ?? true;
        this.throws = config.throws ?? true;
        this.override = config.override ?? true;
    }
}

/**
 * 属性注解配置
 */
export class PropertyAnnotationConfig extends BaseAnnotationConfig {
    property: boolean;
    static: boolean;
    type: boolean;
    defaultValue: boolean;

    constructor(config: Partial<PropertyAnnotationConfig> = {}) {
        super(config);
        this.property = config.property ?? true;
        this.static = config.static ?? true;
        this.type = config.type ?? true;
        this.defaultValue = config.defaultValue ?? true;
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
