export interface IMember {
  name: string;
  startLineNumber: number;

  setStartLineNumber(num: number): void;
}

export interface IClassMember extends IMember {
  class: boolean;
  abstract: boolean;
  extends: string;
  implements: Array<string>;
  template: Array<string>;
}
export enum MethodType {
  FUNCTION = 0,
  METHOD,
  CONSTRUCTOR,
}
export enum AccessType {
  PUBLIC = 0,
  PRIVATE,
  PROTECTED,
}
export interface IMethodMember extends IMember {
  async: boolean;
  method: MethodType;
  throws: Set<string>;
  params: string[][];
  returnType: string;
  static: boolean;
  access: AccessType;
  template: Array<string>;
}
export interface IPropertyMember extends IMember {
  property: boolean;
  type: string;
  static: boolean;
  default: string;
  access: string;
  template: Array<string>;
}
export interface IInterfaceMember extends IMember {
  interface: boolean;
  extends: Array<string>;
  template: Array<string>;
}
export interface IEnumMember extends Omit<IMember, 'template'> {
  enum: boolean;
  enumMembers: { name: string; value: string | undefined }[];
}
export interface ITypedefMember extends Omit<IMember, 'template'> {
  typedef: string;
}
