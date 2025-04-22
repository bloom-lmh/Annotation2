import { IClassAnnotationConfig } from './configType';

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
