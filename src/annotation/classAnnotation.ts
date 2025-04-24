import { ClassAnnotationConfig } from '../config/classAnnotationConfig';
import { GlobalAnnotationConfig } from '../config/globalAnnotationConfig';
import { JSDocGenerator } from '../jsDoc/jsDocGenerator';
import { IClassMember } from '../member/memberType';
import { IClassAnnotation } from './annotationType';
export class ClassAnnotation implements IClassAnnotation {
  classTag: boolean;
  abstractTag: boolean;
  extendsTag: string;
  implementsTag: Array<string>;
  authorTag: string;
  aliasTag: boolean;
  versionTag: string;
  nameTag: string;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
  templateTag: string[];
  startLineNumber: number;
  private authorInfo: string = '';
  constructor(
    globalAnnotationConfig: GlobalAnnotationConfig,
    concreteAnnotationConfig: ClassAnnotationConfig,
    member: IClassMember,
  ) {
    // 解构配置信息
    const {
      class: _class,
      abstract: _abstract,
      extends: _extends,
      implements: _implements,
      name: _name,
      startLineNumber: _startLineNumber,
      template: _template,
    } = member;
    const { authorInfo, versionInfo } = globalAnnotationConfig;
    const {
      isClassTag,
      isAbstractTag,
      isImplementsTag,
      isExtendsTag,
      isAuthorTag,
      isAliasTag,
      isVersionTag,
      isNameTag,
      isDescriptionTag,
      isSeeTag,
      isExampleTag,
      isTemplateTag,
    } = concreteAnnotationConfig;
    // 赋值
    this.classTag = isClassTag && _class;
    this.abstractTag = isAbstractTag && _abstract;
    this.extendsTag = isExtendsTag ? _extends : '';
    this.implementsTag = isImplementsTag ? _implements : [];
    this.authorTag = isAuthorTag ? authorInfo : '';
    this.aliasTag = isAliasTag;
    this.versionTag = isVersionTag ? versionInfo : '';
    this.nameTag = isNameTag ? _name : '';
    this.descriptionTag = isDescriptionTag;
    this.seeTag = isSeeTag;
    this.exampleTag = isExampleTag;
    this.templateTag = isTemplateTag ? _template : [];
    this.startLineNumber = _startLineNumber;
  }

  buildJSDoc() {
    // todo 设置template tag
    let jsdoc = new JSDocGenerator()
      .setClassTag(this.classTag)
      .setAbstract(this.abstractTag)
      .setExtendsTag(this.extendsTag)
      .setImplementsTag(this.implementsTag)
      .setAuthorTag(this.authorTag)
      .setAliasTag(this.aliasTag)
      .setVersionTag(this.versionTag)
      .setNameTag(this.nameTag)
      .setDescriptionTag(this.descriptionTag)
      .setSeeTag(this.seeTag)
      .setExampleTag(this.exampleTag)
      .build();
    return jsdoc;
  }
}
