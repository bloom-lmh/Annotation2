import { IInterfaceAnnotationConfig } from './configType';

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
