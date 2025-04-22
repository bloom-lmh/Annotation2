import { IClassMember } from './memberType';

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
    template: templateValue,
  }: Partial<IClassMember> = {}) {
    // 根据是否传入参数来设置默认值
    this.class = classValue ?? true; // 默认值为 true
    this.abstract = abstractValue ?? false; // 默认值为 false
    this.extends = extendsValue ?? ''; // 默认值为空字符串
    this.implements = implementsValue ?? []; // 默认值为空数组
    this.name = nameValue ?? 'UnnamedClass'; // 默认值为 "UnnamedClass"
    this.startLineNumber = startLineNumberValue ?? 0; // 默认值为 0
    this.template = templateValue ?? []; // 默认值为空数组
  }
  // 链式 set 方法
  setClass(classValue: boolean): this {
    this.class = classValue;
    return this;
  }

  setAbstract(abstractValue: boolean): this {
    this.abstract = abstractValue;
    return this;
  }

  setExtends(extendsValue: string): this {
    this.extends = extendsValue;
    return this;
  }

  setImplements(implementsValue: string[]): this {
    this.implements = implementsValue;
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
  // todo处理泛型
}
