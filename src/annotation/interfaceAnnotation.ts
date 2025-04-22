import { GlobalAnnotationConfig } from '../config/globalAnnotationConfig';
import { InterfaceAnnotationConfig } from '../config/interfaceAnnotationConfig';
import { JSDocGenerator } from '../generator/jsDocGenerator';
import { InterfaceMember } from '../member/interfaceMember';
import { IInterfaceAnnotation } from './annotationType';

export class InterfaceAnnotation implements IInterfaceAnnotation {
  interfaceTag: boolean;
  extendsTag: string[];
  authorTag: string;
  aliasTag: boolean;
  versionTag: string;
  nameTag: string;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
  templateTag: string[];

  constructor(
    globalAnnotationConfig: GlobalAnnotationConfig,
    concreteAnnotationConfig: InterfaceAnnotationConfig,
    member: InterfaceMember,
  ) {
    // 解构成员参数
    const { name: _name, extends: _extends, template: _template, interface: _interface } = member;

    // 解构配置参数
    const {
      isInterfaceTag,
      isExtendsTag,
      isAliasTag,
      isNameTag,
      isDescriptionTag,
      isSeeTag,
      isExampleTag,
      isTemplateTag,
      isAuthorTag,
      isVersionTag,
    } = concreteAnnotationConfig;

    const { authorInfo, versionInfo } = globalAnnotationConfig;

    // 初始化标签
    this.interfaceTag = isInterfaceTag;
    this.extendsTag = isExtendsTag ? _extends : [];
    this.authorTag = isAuthorTag ? authorInfo : '';
    this.aliasTag = isAliasTag;
    this.versionTag = isVersionTag ? versionInfo : '';
    this.nameTag = isNameTag ? _name : '';
    this.descriptionTag = isDescriptionTag;
    this.seeTag = isSeeTag;
    this.exampleTag = isExampleTag;
    this.templateTag = isTemplateTag ? _template : [];
  }

  public buildJSDoc(): string {
    return new JSDocGenerator()
      .setInterfaceTag(this.interfaceTag)
      .setExtendsTag(this.extendsTag)
      .setAuthorTag(this.authorTag)
      .setAliasTag(this.aliasTag)
      .setVersionTag(this.versionTag)
      .setNameTag(this.nameTag)
      .setDescriptionTag(this.descriptionTag)
      .setSeeTag(this.seeTag)
      .setExampleTag(this.exampleTag)
      .build();
  }
}
