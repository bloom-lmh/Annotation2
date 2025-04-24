import { GlobalAnnotationConfig } from '../config/globalAnnotationConfig';
import { FileAnnotationConfig } from '../config/fileAnnotationConfig';
import { JSDocGenerator } from '../jsDoc/jsDocGenerator';
import { IFileAnnotation } from './annotationType';

export class FileAnnotation implements IFileAnnotation {
  authorTag: string;
  descriptionTag: boolean;
  licenseTag: string;
  copyrightTag: string;
  seeTag: boolean;
  namespaceTag: boolean;
  moduleTag: boolean;
  requireTag: boolean;
  fileoverviewTag: boolean;
  startLineNumber: number = 0;
  constructor(
    globalAnnotationConfig: GlobalAnnotationConfig,
    concreteAnnotationConfig: FileAnnotationConfig,
  ) {
    // 解构配置参数
    const {
      isAuthorTag,
      isDescriptionTag,
      isLicenseTag,
      isCopyrightTag,
      isSeeTag,
      isNamespaceTag,
      isModuleTag,
      isRequireTag,
      isFileoverviewTag,
    } = concreteAnnotationConfig;
    const { authorInfo, licenseInfo, copyrightInfo } = globalAnnotationConfig;
    // 初始化标签
    this.authorTag = isAuthorTag ? authorInfo : '';
    this.descriptionTag = isDescriptionTag;
    this.licenseTag = isLicenseTag ? licenseInfo : '';
    this.copyrightTag = isCopyrightTag ? copyrightInfo : '';
    this.seeTag = isSeeTag;
    this.namespaceTag = isNamespaceTag;
    this.moduleTag = isModuleTag;
    this.requireTag = isRequireTag;
    this.fileoverviewTag = isFileoverviewTag;
  }

  public buildJSDoc(): string {
    const generator = new JSDocGenerator()
      .setAuthorTag(this.authorTag)
      .setDescriptionTag(this.descriptionTag)
      .setLicenseTag(this.licenseTag)
      .setCopyrightTag(this.copyrightTag)
      .setSeeTag(this.seeTag)
      .setModuleTag(this.moduleTag);

    return generator.build();
  }
}
