export interface AnnotationBehaviorSettings {
  mode: 'insert' | 'replace' | 'skip';
}

export interface AnnotationGlobalSettings {
  authorInfo: string;
  versionInfo: string;
  licenseInfo: string;
  copyrightInfo: string;
}

export interface ClassTagSettings {
  classTag: boolean;
  abstractTag: boolean;
  extendsTag: boolean;
  implementsTag: boolean;
  authorTag: boolean;
  aliasTag: boolean;
  versionTag: boolean;
  nameTag: boolean;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
  templateTag: boolean;
}

export interface MethodTagSettings {
  asyncTag: boolean;
  functionTag: boolean;
  constructorTag: boolean;
  throwsTag: boolean;
  paramsTag: boolean;
  returnsTag: boolean;
  staticTag: boolean;
  accessTag: boolean;
  authorTag: boolean;
  aliasTag: boolean;
  versionTag: boolean;
  nameTag: boolean;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
  templateTag: boolean;
}

export interface PropertyTagSettings {
  propertyTag: boolean;
  typeTag: boolean;
  staticTag: boolean;
  defaultTag: boolean;
  aliasTag: boolean;
  nameTag: boolean;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
  templateTag: boolean;
}

export interface InterfaceTagSettings {
  interfaceTag: boolean;
  extendsTag: boolean;
  authorTag: boolean;
  versionTag: boolean;
  templateTag: boolean;
  aliasTag: boolean;
  nameTag: boolean;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
}

export interface EnumTagSettings {
  enumTag: boolean;
  aliasTag: boolean;
  nameTag: boolean;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
}

export interface TypedefTagSettings {
  typedefTag: boolean;
  typeTag: boolean;
  templateTag: boolean;
  aliasTag: boolean;
  nameTag: boolean;
  descriptionTag: boolean;
  seeTag: boolean;
  exampleTag: boolean;
}

export interface AnnotationSettings {
  behavior: AnnotationBehaviorSettings;
  global: AnnotationGlobalSettings;
  class: { tags: ClassTagSettings };
  method: { tags: MethodTagSettings };
  property: { tags: PropertyTagSettings };
  interface: { tags: InterfaceTagSettings };
  enum: { tags: EnumTagSettings };
  typedef: { tags: TypedefTagSettings };
}

export type PlainObject = Record<string, unknown>;
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
