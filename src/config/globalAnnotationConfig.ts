import { IGlobalAnnotationConfig } from './configType';

export class GlobalAnnotationConfig implements IGlobalAnnotationConfig {
  authorInfo: string;
  versionInfo: string;
  licenseInfo: string;
  copyrightInfo: string;

  // 构造器使用解构语法
  constructor(config: Partial<IGlobalAnnotationConfig> = {}) {
    const { authorInfo = '', versionInfo = '', licenseInfo = '', copyrightInfo = '' } = config;

    // 使用解构后的值进行赋值
    this.authorInfo = authorInfo;
    this.versionInfo = versionInfo;
    this.licenseInfo = licenseInfo;
    this.copyrightInfo = copyrightInfo;
  }

  // 链式编程的 set 方法
  setAuthorInfo(value: string): this {
    this.authorInfo = value;
    return this;
  }

  setVersionInfo(value: string): this {
    this.versionInfo = value;
    return this;
  }

  setLicenseInfo(value: string): this {
    this.licenseInfo = value;
    return this;
  }

  setCopyrightInfo(value: string): this {
    this.copyrightInfo = value;
    return this;
  }
}
