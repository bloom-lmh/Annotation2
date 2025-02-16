export interface IBaseAnnotation {
  authorTag: boolean;  // 是否包含作者信息
  accessTag: boolean;  // 是否包含访问控制
  aliasTag: boolean;  // 是否包含别名
  versionTag: boolean;  // 是否包含版本
  nameTag: boolean;  // 是否包含名称
  descriptionTag: boolean;  // 是否包含描述
  licenseTag: boolean;  // 是否包含许可证
  copyrightTag: boolean;  // 是否包含版权
  seeTag: boolean;  // 是否包含 See 参考
  summaryTag: boolean;  // 是否包含摘要
  exampleTag: boolean;  // 是否包含示例
  templateTag: boolean;
  namespaceTag: boolean;// 声明模块名称和命名空间，组织代码结构。
  moduleTag: boolean;  // 声明模块名称和命名空间，组织代码结构。
  requireTag: boolean;  // 指明文件的依赖模块。
  fileoverview: boolean
}
// 文件级别的标签
type onlyFile = 'namespaceTag' | 'moduleTag' | 'requireTag' | 'fileoverview' | 'licenseTag' | 'copyrightTag' | 'summaryTag'

export interface IClassAnnotation extends Omit<IBaseAnnotation, 'isAccessTag' | onlyFile> {
  classTag: boolean;
  abstractTag: boolean;
  extendsTag: boolean;
  implementsTag: boolean;
}
export interface IMethodAnnotation extends Omit<IBaseAnnotation, onlyFile> {
  asyncTag: boolean;
  functionTag: boolean;
  constructorTag: boolean;
  throwsTag: boolean;
  paramsTag: boolean;
  returnsTag: boolean;
  staticTag: boolean;
}
export interface IPropertyAnnotationConfig extends Omit<IBaseAnnotation, 'isAuthorTag' | 'isAccessTag' | 'isVersionTag' | onlyFile> {
  propertyTag: boolean;
  staticTag: boolean;
  typeTag: boolean;
  defaultTag: boolean;
}
export interface IInterfaceAnnotationConfig extends Omit<IBaseAnnotation, 'isAccessTag' | onlyFile> {
  interfaceTag: boolean;
  extendsTag: boolean;
}
export interface IEnumAnnotationConfig extends Omit<IBaseAnnotation, 'isAuthorTag' | 'isAccessTag' | 'isVersionTag' | 'isTemplateTag' | onlyFile> {
  enumTag: boolean;
}
export interface ITypedefAnnotationConfig extends Omit<IBaseAnnotation, 'isAuthorTag' | 'isAccessTag' | 'isVersionTag' | 'isTemplateTag' | onlyFile> {
  typedefTag: boolean;
  typeTag: boolean;
}
export interface IFileAnnotationConfig extends Omit<IBaseAnnotation, 'isAccessTag' | 'isAliasTag' | 'isVersionTag' | 'isNameTag' | 'isDescription' | 'isSummaryTag' | 'isExampleTag' | 'isTemplateTag'> {

}