import { IPropertyAnnotationConfig } from './configType';

export class PropertyAnnotationConfig implements IPropertyAnnotationConfig {
  isPropertyTag: boolean;
  isTypeTag: boolean;
  isStaticTag: boolean;
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
