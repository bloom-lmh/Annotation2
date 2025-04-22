import { ISystemConfig } from './configType';

enum CreateStrategy {
  REGEXP_STRATEGY = 0,
  AST_STRATEGY,
  MIX_STRATEGY,
}
enum CreateMode {
  ADD_MODE = 0,
  DELETE_MODE,
  UPDATE_MODE,
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
