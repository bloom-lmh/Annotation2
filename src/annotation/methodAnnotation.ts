import { GlobalAnnotationConfig } from '../config/globalAnnotationConfig';
import { MethodAnnotationConfig } from '../config/methodAnnotationConfig';
import { JSDocGenerator } from '../generator/jsDocGenerator';
import { AccessType, MethodType } from '../member/memberType';
import { MethodMember } from '../member/methodMember';
import { IMethodAnnotation } from './annotationType';

export class MethodAnnotation implements IMethodAnnotation {
  asyncTag: boolean;
  methodTag: MethodType;
  throwsTag: Set<string>;
  paramsTag: string[][];
  returnsTag: string;
  staticTag: boolean;
  accessTag: AccessType;
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
    concreteAnnotationConfig: MethodAnnotationConfig,
    member: MethodMember,
  ) {
    // 解构配置
    const {
      isParamsTag,
      isReturnsTag,
      isThrowsTag,
      isAsyncTag,
      isAuthorTag,
      isVersionTag,
      isNameTag,
      isDescriptionTag,
      isSeeTag,
      isAliasTag,
      isAccessTag,
      isStaticTag,
      isExampleTag,
      isTemplateTag,
    } = concreteAnnotationConfig;
    const { authorInfo, versionInfo } = globalAnnotationConfig;
    const {
      async: _async,
      method: _method,
      throws: _throws,
      params: _params,
      returnType: _returnType,
      static: _static,
      access: _access,
      name: _name,
      startLineNumber: _startLineNumber,
      template: _template,
    } = member;
    this.asyncTag = isAsyncTag && _async;
    this.methodTag = _method;
    this.throwsTag = isThrowsTag ? _throws : new Set<string>();
    this.paramsTag = isParamsTag ? _params : [];
    this.returnsTag = isReturnsTag ? _returnType : '';
    this.staticTag = isStaticTag && _static;
    this.accessTag = isAccessTag ? _access : AccessType.PUBLIC;
    this.authorTag = isAuthorTag ? authorInfo : '<authorName>';
    this.aliasTag = isAliasTag;
    this.versionTag = isVersionTag ? versionInfo : '<1.0.0>';
    this.nameTag = isNameTag ? _name : '';
    this.descriptionTag = isDescriptionTag;
    this.seeTag = isSeeTag;
    this.exampleTag = isExampleTag;
    this.templateTag = isTemplateTag ? _template : [];
  }

  public buildJSDoc(): string {
    return new JSDocGenerator()
      .setNameTag(this.nameTag)
      .setMethodTag(this.methodTag)
      .setThrowsTag(this.throwsTag)
      .setParamsTag(this.paramsTag)
      .setReturnsTag(this.returnsTag)
      .setStaticTag(this.staticTag)
      .setAccessTag(this.accessTag)
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
