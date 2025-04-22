import { IPropertyMember } from './memberType';

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
    template,
  }: Partial<IPropertyMember> = {}) {
    this.property = property ?? true; // 默认值为 true
    this.type = type ?? ''; // 默认值为 "string"
    this.static = staticValue ?? false; // 默认值为 false
    this.default = defaultValue ?? ''; // 默认值为空字符串
    this.access = access ?? 'public'; // 默认值为 "public"
    this.name = name ?? 'UnnamedProperty'; // 默认值为 "UnnamedProperty"
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
