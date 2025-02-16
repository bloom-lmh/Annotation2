import { ClassAnnotationConfig, GlobalAnnotationConfig } from "../config/config";
import { JSDocGenerator } from "../generator/jsDocGenerator";
import { IClassMember } from "../member/memberType";
import { IBaseAnnotation, IClassAnnotation } from "./annotationType";


/* export class ClassAnnotation implements IClassAnnotation {
  classTag: boolean;
  abstractTag: boolean;
  extendsTag: boolean;
  implementsTag: boolean;
  authorTag: boolean;
  accessTag: boolean;
  aliasTag: boolean;
  versionTag: boolean;
  nameTag: boolean;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
  templateTag: boolean;
  constructor(member: IClassMember, globalAnnotationConfig: GlobalAnnotationConfig, concreteAnnotationConfig: ClassAnnotationConfig) {
    // 解构配置信息
    let { class: _class, abstract: _abstract, extends: _extends, implements: _implements, name: _name, startLineNumber: _startLineNumber, template: _template } = member
    let { authorInfo, versionInfo, licenseInfo, copyrightInfo } = globalAnnotationConfig
    let { isClassTag, isAbstractTag, isImplementsTag } = concreteAnnotationConfig
    // 赋值
    this.classTag = isClassTag
    this.abstractTag = isAbstractTag
    this.implementsTag = isImplementsTag
  }
  buildJsDoc() { }
}
 */