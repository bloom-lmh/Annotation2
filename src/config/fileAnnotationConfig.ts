import { IFileAnnotationConfig } from './configType';

export class FileAnnotationConfig implements IFileAnnotationConfig {
  isNamespaceTag: boolean;
  isModuleTag: boolean;
  isRequireTag: boolean;
  isFileoverviewTag: boolean;
  isLicenseTag: boolean;
  isCopyrightTag: boolean;
  isAuthorTag: boolean;
  isDescriptionTag: boolean;
  isSeeTag: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<IFileAnnotationConfig> = {}) {
    const {
      isNamespaceTag = false,
      isModuleTag = true,
      isRequireTag = false,
      isFileoverviewTag = true,
      isLicenseTag = true,
      isCopyrightTag = true,
      isAuthorTag = true,
      isDescriptionTag = true,
      isSeeTag = false,
    } = config;

    // 使用解构后的值进行赋值
    this.isNamespaceTag = isNamespaceTag;
    this.isModuleTag = isModuleTag;
    this.isRequireTag = isRequireTag;
    this.isFileoverviewTag = isFileoverviewTag;
    this.isLicenseTag = isLicenseTag;
    this.isCopyrightTag = isCopyrightTag;
    this.isAuthorTag = isAuthorTag;
    this.isDescriptionTag = isDescriptionTag;
    this.isSeeTag = isSeeTag;
  }

  // 链式编程的 set 方法
  setNamespaceTag(value: boolean): this {
    this.isNamespaceTag = value;
    return this;
  }

  setModuleTag(value: boolean): this {
    this.isModuleTag = value;
    return this;
  }

  setRequireTag(value: boolean): this {
    this.isRequireTag = value;
    return this;
  }

  setFileoverview(value: boolean): this {
    this.isFileoverviewTag = value;
    return this;
  }

  setLicenseTag(value: boolean): this {
    this.isLicenseTag = value;
    return this;
  }

  setCopyrightTag(value: boolean): this {
    this.isCopyrightTag = value;
    return this;
  }

  setAuthorTag(value: boolean): this {
    this.isAuthorTag = value;
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
}
