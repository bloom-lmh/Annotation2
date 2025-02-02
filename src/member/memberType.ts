interface IMember {
  name: string,
  startLineNumber: number
  template: Array<string>
}

export interface IClassMember extends IMember {
  class: boolean;
  abstract: boolean;
  extends: string;
  implements: Array<string>;
}
export enum MethodType {
  FUNCTION = 0,
  METHOD,
  CONSTRUCTOR
}
export interface IMethodMember extends IMember {
  async: boolean;
  method: MethodType;
  throws: Set<string>;
  params: string[][];
  returnType: string;
  static: boolean;
  access: string;
}
export interface IPropertyMember extends IMember {
  property: boolean;
  type: string;
  static: boolean;
  default: string;
  access: string
}
export interface IInterfaceMember extends IMember {
  interface: boolean;
  extends: Array<string>
}
export interface IEnumMember extends Omit<IMember, 'template'> {
  enum: boolean;
  enumMembers: { name: string; value: string | undefined; }[]
}
export interface ITypedefMember extends Omit<IMember, 'template'> {
  typedef: boolean;
  type: string;
}
