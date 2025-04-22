import { IInterfaceMember } from './memberType';

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
    template,
  }: Partial<IInterfaceMember> = {}) {
    this.interface = interfaceValue ?? true; // 默认值为 true
    this.extends = extendsValue ?? []; // 默认值为空数组
    this.name = name ?? 'UnnamedInterface'; // 默认值为 "UnnamedInterface"
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
