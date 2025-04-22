import { GlobalAnnotationConfig } from '../config/globalAnnotationConfig';
import { EnumAnnotationConfig } from '../config/enumAnnotationConfig';
import { JSDocGenerator } from '../generator/jsDocGenerator';
import { EnumMember } from '../member/enumMember';
import { IEnumAnnotation } from './annotationType';

export class EnumAnnotation implements IEnumAnnotation {
  enumTag: boolean;
  aliasTag: boolean;
  nameTag: string;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
  constructor(
    globalAnnotationConfig: GlobalAnnotationConfig,
    concreteAnnotationConfig: EnumAnnotationConfig,
    member: EnumMember,
  ) {
    // 解构成员参数
    const { name: _name, enum: _enum, enumMembers: _enumMember } = member;

    // 解构配置参数
    const { isEnumTag, isAliasTag, isNameTag, isDescriptionTag, isSeeTag, isExampleTag } =
      concreteAnnotationConfig;

    // 初始化标签
    this.enumTag = isEnumTag;
    this.aliasTag = isAliasTag;
    this.nameTag = isNameTag ? _name : '';
    this.descriptionTag = isDescriptionTag;
    this.seeTag = isSeeTag;
    this.exampleTag = isExampleTag;
  }

  public buildJSDoc(): string {
    return new JSDocGenerator()
      .setEnumTag(this.enumTag)
      .setAliasTag(this.aliasTag)
      .setNameTag(this.nameTag)
      .setDescriptionTag(this.descriptionTag)
      .setSeeTag(this.seeTag)
      .setExampleTag(this.exampleTag)
      .build();
  }
}
