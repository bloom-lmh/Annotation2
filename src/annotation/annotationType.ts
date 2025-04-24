import { AccessType, MethodType } from '../member/memberType';

export interface IBaseAnnotation {
  authorTag: string; // 是否包含作者信息
  accessTag: AccessType; // 是否包含访问控制信息标签
  aliasTag: boolean; // 是否包含别名
  versionTag: string; // 是否包含版本
  nameTag: string; // 是否包含名称
  descriptionTag: boolean; // 是否包含描述
  licenseTag: string; // 是否包含许可证
  copyrightTag: string; // 是否包含版权
  seeTag: boolean; // 是否包含 See 参考
  summaryTag: boolean; // 是否包含摘要
  exampleTag: boolean; // 是否包含示例
  templateTag: string[];
  namespaceTag: boolean; // 声明模块名称和命名空间，组织代码结构。
  moduleTag: boolean; // 声明模块名称和命名空间，组织代码结构。
  requireTag: boolean; // 指明文件的依赖模块。
  fileoverviewTag: boolean;
  startLineNumber: number;
  buildJSDoc(): string;
}
// 文件级别的标签
type onlyFile =
  | 'namespaceTag'
  | 'moduleTag'
  | 'requireTag'
  | 'fileoverviewTag'
  | 'licenseTag'
  | 'copyrightTag'
  | 'summaryTag';

export interface IClassAnnotation extends Omit<IBaseAnnotation, 'accessTag' | onlyFile> {
  classTag: boolean;
  abstractTag: boolean;
  extendsTag: string;
  implementsTag: Array<string>;
}
export interface IMethodAnnotation extends Omit<IBaseAnnotation, onlyFile> {
  asyncTag: boolean;
  methodTag: MethodType;
  throwsTag: Set<String>;
  paramsTag: string[][];
  returnsTag: string;
  staticTag: boolean;
}
export interface IPropertyAnnotation
  extends Omit<IBaseAnnotation, 'authorTag' | 'accessTag' | 'versionTag' | onlyFile> {
  propertyTag: boolean;
  staticTag: boolean;
  typeTag: string;
  defaultTag: string;
}
export interface IInterfaceAnnotation extends Omit<IBaseAnnotation, 'accessTag' | onlyFile> {
  interfaceTag: boolean;
  extendsTag: string[];
}
export interface IEnumAnnotation
  extends Omit<
    IBaseAnnotation,
    'authorTag' | 'accessTag' | 'versionTag' | 'templateTag' | onlyFile
  > {
  enumTag: boolean;
}
export interface ITypedefAnnotation
  extends Omit<
    IBaseAnnotation,
    'authorTag' | 'accessTag' | 'versionTag' | 'templateTag' | onlyFile
  > {
  typedefTag: string;
}
export interface IFileAnnotation
  extends Omit<
    IBaseAnnotation,
    | 'accessTag'
    | 'aliasTag'
    | 'versionTag'
    | 'nameTag'
    | 'descriptionTag'
    | 'summaryTag'
    | 'exampleTag'
    | 'templateTag'
  > {}
