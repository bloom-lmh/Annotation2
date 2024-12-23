/**
 * 成员信息
 */
export abstract class Member {
  public name: string;

  constructor(name: string = "") {
    this.name = name;
  }
}

/**
 * 类成员信息
 */
export class ClassMember extends Member {
  public class: boolean;
  public abstract: boolean;
  public extends: string;
  public implements: Array<string>;

  constructor(name: string = "", _class: boolean = true, _abstract: boolean = false, _extends: string = "", _implements: Array<string> = []) {
    super(name);
    this.class = _class;
    this.abstract = _abstract;
    this.extends = _extends;
    this.implements = _implements;
  }
}

/**
 * 方法成员信息
 */
export class MethodMember extends Member {
  public async: boolean;
  public function: boolean;
  public _constructor: boolean;
  public throws: Set<string>;
  public params: string[][];
  public returns: string;
  public static: boolean;
  public access: string;

  constructor(
    name: string = "",
    _async: boolean = false,
    _function: boolean = true,
    _constructor: boolean = false,
    _throws: Set<string> = new Set(),
    _params: string[][] = [[]],
    _returns: string = "",
    _static: boolean = true,
    _access: string = ""
  ) {
    super(name);
    this.async = _async;
    this.function = _function;
    this._constructor = _constructor
    this.throws = _throws;
    this.params = _params;
    this.returns = _returns;
    this.static = _static;
    this.access = _access
  }
}

/**
 * 属性成员信息
 */
export class PropertyMember extends Member {
  public property: boolean;
  public type: string;
  public static: boolean;
  public default: string;
  public access: string

  constructor(name: string = "", _property: boolean = true, _type: string = "", _static: boolean = false, _default: string = "", _access: string = "") {
    super(name);
    this.property = _property;
    this.type = _type;
    this.static = _static;
    this.default = _default;
    this.access = _access
  }
}

/**
 * 接口成员信息
 */
export class InterfaceMember extends Member {
  public interface: boolean;
  public extends: Array<string>

  constructor(name: string = "", _interface: boolean = true, _extends: Array<string> = []) {
    super(name);
    this.interface = _interface;
    this.extends = _extends
  }
}

/**
 * 枚举成员信息
 */
export class EnumMember extends Member {
  public enum: boolean;
  public enumMembers: { name: string; value: string | undefined; }[]

  constructor(name: string = "", _enum: boolean = true, _enumMembers: { name: string; value: string | undefined; }[] = []) {
    super(name);
    this.enum = _enum;
    this.enumMembers = _enumMembers
  }
}

/**
 * 自定义类型成员信息
 */
export class TypedefMember extends Member {
  public typedef: boolean;
  public type: string;

  constructor(name: string = "", _typedef: boolean = true, _type: string = "") {
    super(name);
    this.typedef = _typedef;
    this.type = _type;
  }
}


/**
 * 成员类型
 */
export type MemberType = ClassMember | MethodMember | PropertyMember | InterfaceMember | EnumMember | TypedefMember