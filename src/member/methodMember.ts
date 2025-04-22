import { AccessType, IMethodMember, MethodType } from './memberType';

export class MethodMember implements IMethodMember {
  async: boolean;
  method: MethodType;
  throws: Set<string>;
  params: string[][];
  returnType: string;
  static: boolean;
  access: AccessType;
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
    template: templateValue,
  }: Partial<IMethodMember> = {}) {
    // 根据是否传入参数来设置默认值
    this.async = asyncValue ?? false; // 默认值为 false
    this.method = methodValue ?? MethodType.METHOD;
    this.throws = throwsValue ?? new Set<string>(); // 默认值为空 Set
    this.params = paramsValue ?? []; // 默认值为空数组
    this.returnType = returnsValue ?? ''; // 默认值为空字符串
    this.static = staticValue ?? false; // 默认值为 false
    this.access = accessValue ?? AccessType.PUBLIC; // 默认值为 "public"
    this.name = nameValue ?? 'UnnamedMethod'; // 默认值为 "UnnamedMethod"
    this.startLineNumber = startLineNumberValue ?? 0; // 默认值为 0
    this.template = templateValue ?? []; // 默认值为空数组
  }

  // 链式 set 方法
  setAsync(asyncValue: boolean): this {
    this.async = asyncValue;
    return this;
  }

  setMethod(methodValue: MethodType): this {
    this.method = methodValue;
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

  setAccess(accessValue: AccessType): this {
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
