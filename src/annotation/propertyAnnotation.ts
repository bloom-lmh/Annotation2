import { GlobalAnnotationConfig } from '../config/globalAnnotationConfig';
import { PropertyAnnotationConfig } from '../config/propertyAnnotationConfig';
import { JSDocGenerator } from '../jsDoc/jsDocGenerator';
import { PropertyMember } from '../member/propertyMember';
import { IPropertyAnnotation } from './annotationType';

export class PropertyAnnotation implements IPropertyAnnotation {
  propertyTag: boolean;
  staticTag: boolean;
  typeTag: string;
  defaultTag: string;
  aliasTag: boolean;
  nameTag: string;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
  templateTag: string[];
  startLineNumber: number;
  constructor(
    globalAnnotationConfig: GlobalAnnotationConfig,
    concreteAnnotationConfig: PropertyAnnotationConfig,
    member: PropertyMember,
  ) {
    // 解构成员
    const {
      property: _property,
      type: _type,
      static: _static,
      default: _default,
      access: _access,
      name: _name,
      template: _template,
      startLineNumber: _startLineNumber,
    } = member;
    // 解构配置参数
    const {
      isPropertyTag,
      isTypeTag,
      isStaticTag,
      isDefaultTag,
      isAliasTag,
      isNameTag,
      isDescriptionTag,
      isSeeTag,
      isExampleTag,
      isTemplateTag,
    } = concreteAnnotationConfig;

    // 初始化属性标签
    this.propertyTag = isPropertyTag;
    this.typeTag = isTypeTag ? _type : '';
    this.staticTag = isStaticTag && _static;
    this.defaultTag = isDefaultTag ? _default : '';
    this.aliasTag = isAliasTag;
    this.nameTag = isNameTag ? _name : '';
    this.descriptionTag = isDescriptionTag;
    this.seeTag = isSeeTag;
    this.exampleTag = isExampleTag;
    this.templateTag = isTemplateTag ? _template : [];
    this.startLineNumber = _startLineNumber;
  }

  public buildJSDoc(): string {
    return new JSDocGenerator()
      .setPropertyTag(this.propertyTag)
      .setStaticTag(this.staticTag)
      .setTypeTag(this.typeTag)
      .setDefaultTag(this.defaultTag)
      .setAliasTag(this.aliasTag)
      .setNameTag(this.nameTag)
      .setDescriptionTag(this.descriptionTag)
      .setSeeTag(this.seeTag)
      .setExampleTag(this.exampleTag)
      .build();
  }
}
