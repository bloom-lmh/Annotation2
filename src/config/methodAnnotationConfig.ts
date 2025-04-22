import { IMethodAnnotationConfig } from './configType';

export class MethodAnnotationConfig implements IMethodAnnotationConfig {
  isAsyncTag: boolean;
  isFunctionTag: boolean;
  isConstructorTag: boolean;
  isThrowsTag: boolean;
  isParamsTag: boolean;
  isReturnsTag: boolean;
  isStaticTag: boolean;
  isAccessTag: boolean;
  isAuthorTag: boolean;
  isAliasTag: boolean;
  isVersionTag: boolean;
  isNameTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;
  isExampleTag: boolean;
  isTemplateTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<IMethodAnnotationConfig> = {}) {
    const {
      isAsyncTag = true,
      isFunctionTag = true,
      isConstructorTag = true,
      isThrowsTag = true,
      isParamsTag = true,
      isReturnsTag = true,
      isStaticTag = true,
      isAccessTag = true,
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
    this.isAsyncTag = isAsyncTag;
    this.isFunctionTag = isFunctionTag;
    this.isConstructorTag = isConstructorTag;
    this.isThrowsTag = isThrowsTag;
    this.isParamsTag = isParamsTag;
    this.isReturnsTag = isReturnsTag;
    this.isStaticTag = isStaticTag;
    this.isAccessTag = isAccessTag;
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
  setAsyncTag(value: boolean): this {
    this.isAsyncTag = value;
    return this;
  }

  setFunctionTag(value: boolean): this {
    this.isFunctionTag = value;
    return this;
  }

  setConstructorTag(value: boolean): this {
    this.isConstructorTag = value;
    return this;
  }

  setThrowsTag(value: boolean): this {
    this.isThrowsTag = value;
    return this;
  }

  setParamsTag(value: boolean): this {
    this.isParamsTag = value;
    return this;
  }

  setReturnsTag(value: boolean): this {
    this.isReturnsTag = value;
    return this;
  }

  setStaticTag(value: boolean): this {
    this.isStaticTag = value;
    return this;
  }

  setAccessTag(value: boolean): this {
    this.isAccessTag = value;
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
