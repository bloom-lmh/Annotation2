import { ITypedefAnnotationConfig } from './configType';

export class TypedefAnnotationConfig implements ITypedefAnnotationConfig {
  isTypedefTag: boolean;
  isTypeTag: boolean;
  isAliasTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<ITypedefAnnotationConfig> = {}) {
    const {
      isTypedefTag = true,
      isTypeTag = true,
      isAliasTag = true,
      isNameTag = true,
      isDescriptionTag = true,
      isSeeTag = true,
      isExampleTag = true,
    } = config;

    // 使用解构后的值进行赋值
    this.isTypedefTag = isTypedefTag;
    this.isTypeTag = isTypeTag;
    this.isAliasTag = isAliasTag;
    this.isNameTag = isNameTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
    this.isExampleTag = isExampleTag;
  }

  // 链式编程的 set 方法
  setTypedefTag(value: boolean): this {
    this.isTypedefTag = value;
    return this;
  }

  setTypeTag(value: boolean): this {
    this.isTypeTag = value;
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
