interface IBaseAnnotationConfig {
  isAuthorTag: boolean;  // 是否包含作者信息
  isAccessTag: boolean;  // 是否包含访问控制
  isAliasTag: boolean;  // 是否包含别名
  isVersionTag: boolean;  // 是否包含版本
  isNameTag: boolean;  // 是否包含名称
  isDescriptionTag: boolean;  // 是否包含描述
  isLicenseTag: boolean;  // 是否包含许可证
  isCopyrightTag: boolean;  // 是否包含版权
  isSeeTag: boolean;  // 是否包含 See 参考
  isSummaryTag: boolean;  // 是否包含摘要
  isExampleTag: boolean;  // 是否包含示例
  isTemplateTag: boolean;
  isNamespaceTag: boolean;// 声明模块名称和命名空间，组织代码结构。
  isModuleTag: boolean;  // 声明模块名称和命名空间，组织代码结构。
  isRequireTag: boolean;  // 指明文件的依赖模块。
  isFileoverview: boolean
}
// 文件级别的标签
type onlyFile = 'isNamespaceTag' | 'isModuleTag' | 'isRequireTag' | 'isFileoverview' | 'isLicenseTag' | 'isCopyrightTag' | 'isSummaryTag'

export interface IClassAnnotationConfig extends Omit<IBaseAnnotationConfig, 'isAccessTag' | onlyFile> {
  isClassTag: boolean;  // 是否是类
  isAbstractTag: boolean;  // 是否是抽象类
  isExtendsTag: boolean;  // 是否继承
  isImplementsTag: boolean;  // 是否实现接口
}


export interface IMethodAnnotationConfig extends Omit<IBaseAnnotationConfig, onlyFile> {
  isAsyncTag: boolean;  // 是否异步
  isFunctionTag: boolean;  // 是否是函数
  isConstructorTag: boolean;  // 是否是构造函数
  isThrowsTag: boolean;  // 是否包含抛出异常
  isParamsTag: boolean;  // 是否包含参数
  isReturnsTag: boolean;  // 是否包含返回值
  isStaticTag: boolean;  // 是否是静态方法
}
export interface IPropertyAnnotationConfig extends Omit<IBaseAnnotationConfig, 'isAuthorTag' | 'isAccessTag' | 'isVersionTag' | onlyFile> {
  isPropertyTag: boolean;  // 是否是属性
  isStaticTag: boolean;  // 是否是静态属性
  isTypeTag: boolean;  // 是否包含类型
  isDefaultTag: boolean;  // 是否包含默认值
}
export interface IInterfaceAnnotationConfig extends Omit<IBaseAnnotationConfig, 'isAccessTag' | onlyFile> {
  isInterfaceTag: boolean;  // 是否是接口
  isExtendsTag: boolean;  // 是否继承
}
export interface IEnumAnnotationConfig extends Omit<IBaseAnnotationConfig, 'isAuthorTag' | 'isAccessTag' | 'isVersionTag' | 'isTemplateTag' | onlyFile> {
  isEnumTag: boolean;  // 是否是枚举类型
}
export interface ITypedefAnnotationConfig extends Omit<IBaseAnnotationConfig, 'isAuthorTag' | 'isAccessTag' | 'isVersionTag' | 'isTemplateTag' | onlyFile> {
  isTypedefTag: boolean;  // 是否是自定义类型
  isTypeTag: boolean;  // 是否是类型
}
export interface IFileAnnotationConfig extends Omit<IBaseAnnotationConfig, 'isAccessTag' | 'isAliasTag' | 'isVersionTag' | 'isNameTag' | 'isDescription' | 'isSummaryTag' | 'isExampleTag' | 'isTemplateTag'> {

}
export interface ITranslateConfig {
  isOpen: boolean;
  api: Map<string, Array<string>> | Array<string> | string
  wordMap: { [key: string]: string };
  isMemoryEnabled: boolean;
}
export interface ISystemConfig {
  // 注解生成策略 混合策略 正则策略 抽象语法树策略 默认采用混合策略，抽象语法树策略性能有缺陷
  annotationCreateStrategy: number
  // 注解生成方式 生成时删除原来的注解 生成时追加注解 生成时更新已有注解
  annotationCreateMode: number
  // 开启配置缓存
  configCache: boolean
}
export interface IGlobalAnnotationConfig {
  authorInfo: string;
  versionInfo: string;
  licenseInfo: string;
  copyrightInfo: string;
}