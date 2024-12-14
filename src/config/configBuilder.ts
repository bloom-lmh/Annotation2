import { ClassAnnotationConfig, Config, GlobalAnnotationConfig, MethodAnnotationConfig, PropertyAnnotationConfig, TranslateConfig } from "./config";

export class ConfigBuilder {
    private classAnnotationConfig?: ClassAnnotationConfig;
    private methodAnnotationConfig?: MethodAnnotationConfig;
    private propertyAnnotationConfig?: PropertyAnnotationConfig;
    private globalAnnotationConfig?: GlobalAnnotationConfig;
    private translateConfig?: TranslateConfig;

    // 设置 classAnnotationConfig
    setClassAnnotationConfig(config: Partial<ClassAnnotationConfig> = {}): ConfigBuilder {
        this.classAnnotationConfig = new ClassAnnotationConfig(config);
        return this;
    }

    // 设置 methodAnnotationConfig
    setMethodAnnotationConfig(config: Partial<MethodAnnotationConfig> = {}): ConfigBuilder {
        this.methodAnnotationConfig = new MethodAnnotationConfig(config);
        return this;
    }

    // 设置 propertyAnnotationConfig
    setPropertyAnnotationConfig(config: Partial<PropertyAnnotationConfig> = {}): ConfigBuilder {
        this.propertyAnnotationConfig = new PropertyAnnotationConfig(config);
        return this;
    }

    // 设置 globalAnnotationConfig
    setGlobalAnnotationConfig(config: Partial<GlobalAnnotationConfig> = {}): ConfigBuilder {
        this.globalAnnotationConfig = new GlobalAnnotationConfig(config);
        return this;
    }

    // 设置 translateConfig
    setTranslateConfig(config: Partial<TranslateConfig> = {}): ConfigBuilder {
        this.translateConfig = new TranslateConfig(config);
        return this;
    }

    // 构建 Config 实例
    build(): Config {
        return new Config({
            classAnnotationConfig: this.classAnnotationConfig,
            methodAnnotationConfig: this.methodAnnotationConfig,
            propertyAnnotationConfig: this.propertyAnnotationConfig,
            globalAnnotationConfig: this.globalAnnotationConfig,
            translateConfig: this.translateConfig
        });
    }
}
