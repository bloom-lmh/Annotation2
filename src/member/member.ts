import { IClassMember, IEnumMember, IInterfaceMember, IMethodMember, IPropertyMember, ITypedefMember, MethodType } from "./memberType";

export class ClassMember implements IClassMember {
  class: boolean;
  abstract: boolean;
  extends: string;
  implements: string[];
  name: string;
  startLineNumber: number;
  template: string[];

  // 构造器使用 Partial<IClassMember>，并在构造器内部设置默认值
  constructor({
    class: classValue,
    abstract: abstractValue,
    extends: extendsValue,
    implements: implementsValue,
    name: nameValue,
    startLineNumber: startLineNumberValue,
    template: templateValue
  }: Partial<IClassMember> = {}) {
    // 根据是否传入参数来设置默认值
    this.class = classValue ?? true; // 默认值为 true
    this.abstract = abstractValue ?? false; // 默认值为 false
    this.extends = extendsValue ?? ""; // 默认值为空字符串
    this.implements = implementsValue ?? []; // 默认值为空数组
    this.name = nameValue ?? "UnnamedClass"; // 默认值为 "UnnamedClass"
    this.startLineNumber = startLineNumberValue ?? 0; // 默认值为 0
    this.template = templateValue ?? []; // 默认值为空数组
  }
  // 链式 set 方法
  setClass(classValue: boolean): this {
    this.class = classValue;
    return this;
  }

  setAbstract(abstractValue: boolean): this {
    this.abstract = abstractValue
    return this;
  }

  setExtends(extendsValue: string): this {
    this.extends = extendsValue
    return this;
  }

  setImplements(implementsValue: string[]): this {
    this.implements = implementsValue;
    return this;
  }

  setName(nameValue: string): this {
    this.name = nameValue
    return this;
  }

  setStartLineNumber(startLineNumberValue: number): this {
    this.startLineNumber = startLineNumberValue;
    return this;
  }

  setTemplate(templateValue: string[]): this {
    this.template = templateValue;
    return this;
  }
  // todo处理泛型
}

export class MethodMember implements IMethodMember {
  async: boolean;
  method: MethodType;
  throws: Set<string>;
  params: string[][];
  returnType: string;
  static: boolean;
  access: string;
  name: string;
  startLineNumber: number;
  template: string[];

  // 构造器使用 Partial，内部判断未提供的参数并赋默认值
  constructor({
    async: asyncValue,
    method: methodValue,
    throws: throwsValue,
    params: paramsValue,
    returnType: returnsValue,
    static: staticValue,
    access: accessValue,
    name: nameValue,
    startLineNumber: startLineNumberValue,
    template: templateValue
  }: Partial<IMethodMember> = {}) {
    // 根据是否传入参数来设置默认值
    this.async = asyncValue ?? false; // 默认值为 false
    this.method = methodValue ?? MethodType.METHOD
    this.throws = throwsValue ?? new Set<string>(); // 默认值为空 Set
    this.params = paramsValue ?? []; // 默认值为空数组
    this.returnType = returnsValue ?? ""; // 默认值为空字符串
    this.static = staticValue ?? false; // 默认值为 false
    this.access = accessValue ?? "public"; // 默认值为 "public"
    this.name = nameValue ?? "UnnamedMethod"; // 默认值为 "UnnamedMethod"
    this.startLineNumber = startLineNumberValue ?? 0; // 默认值为 0
    this.template = templateValue ?? []; // 默认值为空数组
  }

  // 链式 set 方法
  setAsync(asyncValue: boolean): this {
    this.async = asyncValue;
    return this;
  }

  setMethod(methodValue: MethodType): this {
    this.method = methodValue
    return this;
  }

  setThrows(throwsValue: Set<string>): this {
    this.throws = throwsValue;
    return this;
  }

  setParams(paramsValue: string[][]): this {
    this.params = paramsValue;
    return this;
  }

  setReturnType(returnsValue: string): this {
    this.returnType = returnsValue;
    return this;
  }

  setStatic(staticValue: boolean): this {
    this.static = staticValue;
    return this;
  }

  setAccess(accessValue: string): this {
    this.access = accessValue;
    return this;
  }

  setName(nameValue: string): this {
    this.name = nameValue;
    return this;
  }

  setStartLineNumber(startLineNumberValue: number): this {
    this.startLineNumber = startLineNumberValue;
    return this;
  }

  setTemplate(templateValue: string[]): this {
    this.template = templateValue;
    return this;
  }
}




export class PropertyMember implements IPropertyMember {
  property: boolean;
  type: string;
  static: boolean;
  default: string;
  access: string;
  name: string;
  startLineNumber: number;
  template: string[];

  constructor({
    property,
    type,
    static: staticValue,
    default: defaultValue,
    access,
    name,
    startLineNumber,
    template
  }: Partial<IPropertyMember> = {}) {
    this.property = property ?? true; // 默认值为 true
    this.type = type ?? ""; // 默认值为 "string"
    this.static = staticValue ?? false; // 默认值为 false
    this.default = defaultValue ?? ""; // 默认值为空字符串
    this.access = access ?? "public"; // 默认值为 "public"
    this.name = name ?? "UnnamedProperty"; // 默认值为 "UnnamedProperty"
    this.startLineNumber = startLineNumber ?? 0; // 默认值为 0
    this.template = template ?? []; // 默认值为空数组
  }

  setProperty(propertyValue: boolean): this {
    this.property = propertyValue;
    return this;
  }

  setType(typeValue: string): this {
    this.type = typeValue;
    return this;
  }

  setStatic(staticValue: boolean): this {
    this.static = staticValue;
    return this;
  }

  setDefault(defaultValue: string): this {
    this.default = defaultValue;
    return this;
  }

  setAccess(accessValue: string): this {
    this.access = accessValue;
    return this;
  }

  setName(nameValue: string): this {
    this.name = nameValue;
    return this;
  }

  setStartLineNumber(startLineNumberValue: number): this {
    this.startLineNumber = startLineNumberValue;
    return this;
  }

  setTemplate(templateValue: string[]): this {
    this.template = templateValue;
    return this;
  }
}



export class EnumMember implements IEnumMember {
  enum: boolean;
  enumMembers: { name: string; value: string | undefined; }[];
  name: string;
  startLineNumber: number;

  constructor({
    enum: enumValue,
    enumMembers,
    name,
    startLineNumber
  }: Partial<IEnumMember> = {}) {
    this.enum = enumValue ?? true; // 默认值为 true
    this.enumMembers = enumMembers ?? [{ name: "UnnamedEnum", value: undefined }]; // 默认值为包含一个成员的数组
    this.name = name ?? "UnnamedEnum"; // 默认值为 "UnnamedEnum"
    this.startLineNumber = startLineNumber ?? 0; // 默认值为 0
  }

  setEnum(enumValue: boolean): this {
    this.enum = enumValue;
    return this;
  }

  setEnumMembers(enumMembersValue: { name: string; value: string | undefined; }[]): this {
    this.enumMembers = enumMembersValue;
    return this;
  }

  setName(nameValue: string): this {
    this.name = nameValue;
    return this;
  }

  setStartLineNumber(startLineNumberValue: number): this {
    this.startLineNumber = startLineNumberValue;
    return this;
  }
}


export class InterfaceMember implements IInterfaceMember {
  interface: boolean;
  extends: string[];
  name: string;
  startLineNumber: number;
  template: string[];

  constructor({
    interface: interfaceValue,
    extends: extendsValue,
    name,
    startLineNumber,
    template
  }: Partial<IInterfaceMember> = {}) {
    this.interface = interfaceValue ?? true; // 默认值为 true
    this.extends = extendsValue ?? []; // 默认值为空数组
    this.name = name ?? "UnnamedInterface"; // 默认值为 "UnnamedInterface"
    this.startLineNumber = startLineNumber ?? 0; // 默认值为 0
    this.template = template ?? []; // 默认值为空数组
  }

  setInterface(interfaceValue: boolean): this {
    this.interface = interfaceValue;
    return this;
  }

  setExtends(extendsValue: string[]): this {
    this.extends = extendsValue;
    return this;
  }

  setName(nameValue: string): this {
    this.name = nameValue;
    return this;
  }

  setStartLineNumber(startLineNumberValue: number): this {
    this.startLineNumber = startLineNumberValue;
    return this;
  }

  setTemplate(templateValue: string[]): this {
    this.template = templateValue;
    return this;
  }
}


export class TypedefMember implements ITypedefMember {
  typedef: boolean;
  type: string;
  name: string;
  startLineNumber: number;

  constructor({
    typedef: typedefValue,
    type,
    name,
    startLineNumber
  }: Partial<ITypedefMember> = {}) {
    this.typedef = typedefValue ?? true; // 默认值为 true
    this.type = type ?? "string"; // 默认值为 "string"
    this.name = name ?? "UnnamedTypedef"; // 默认值为 "UnnamedTypedef"
    this.startLineNumber = startLineNumber ?? 0; // 默认值为 0
  }

  setTypedef(typedefValue: boolean): this {
    this.typedef = typedefValue;
    return this;
  }

  setType(typeValue: string): this {
    this.type = typeValue;
    return this;
  }

  setName(nameValue: string): this {
    this.name = nameValue;
    return this;
  }

  setStartLineNumber(startLineNumberValue: number): this {
    this.startLineNumber = startLineNumberValue;
    return this;
  }
}
