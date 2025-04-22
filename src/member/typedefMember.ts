import { ITypedefMember } from './memberType';

export class TypedefMember implements ITypedefMember {
  typedef: string;
  name: string;
  startLineNumber: number;

  constructor({ typedef, name, startLineNumber }: Partial<ITypedefMember> = {}) {
    this.typedef = typedef ?? '';
    this.name = name ?? 'UnnamedTypedef'; // 默认值为 "UnnamedTypedef"
    this.startLineNumber = startLineNumber ?? 0; // 默认值为 0
  }

  setTypedef(typedefValue: string): this {
    this.typedef = typedefValue;
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
