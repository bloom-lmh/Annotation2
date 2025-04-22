import { GlobalAnnotationConfig } from '../config/globalAnnotationConfig';
import { TypedefAnnotationConfig } from '../config/typedefAnnotationConfig';
import { JSDocGenerator } from '../generator/jsDocGenerator';
import { TypedefMember } from '../member/typedefMember';
import { ITypedefAnnotation } from './annotationType';

export class TypedefAnnotation implements ITypedefAnnotation {
  typedefTag: string;
  aliasTag: boolean;
  nameTag: string;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;

  constructor(
    globalAnnotationConfig: GlobalAnnotationConfig,
    concreteAnnotationConfig: TypedefAnnotationConfig,
    member: TypedefMember,
  ) {
    // 解构成员参数
    const { name: _name, typedef: _typedef } = member;

    // 解构配置参数
    const {
      isTypedefTag,
      isTypeTag,
      isAliasTag,
      isNameTag,
      isDescriptionTag,
      isSeeTag,
      isExampleTag,
    } = concreteAnnotationConfig;

    // 初始化标签
    this.typedefTag = isTypedefTag ? _typedef : '';
    this.aliasTag = isAliasTag;
    this.nameTag = isNameTag ? _name : '';
    this.descriptionTag = isDescriptionTag;
    this.seeTag = isSeeTag;
    this.exampleTag = isExampleTag;
  }

  public buildJSDoc(): string {
    return new JSDocGenerator()
      .setTypedefTag(this.typedefTag)
      .setAliasTag(this.aliasTag)
      .setNameTag(this.nameTag)
      .setDescriptionTag(this.descriptionTag)
      .setSeeTag(this.seeTag)
      .setExampleTag(this.exampleTag)
      .build();
  }
}
