import { IEnumAnnotationConfig } from './configType';

export class EnumAnnotationConfig implements IEnumAnnotationConfig {
  isEnumTag: boolean;
  isAliasTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<IEnumAnnotationConfig> = {}) {
    const {
      isEnumTag = true,
      isAliasTag = false,
      isNameTag = true,
      isDescriptionTag = true,
      isSeeTag = false,
      isExampleTag = false,
    } = config;

    // 使用解构后的值进行赋值
    this.isEnumTag = isEnumTag;
    this.isAliasTag = isAliasTag;
    this.isNameTag = isNameTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
    this.isExampleTag = isExampleTag;
  }

  // 链式编程的 set 方法
  setEnumTag(value: boolean): this {
    this.isEnumTag = value;
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
