import { IEnumMember } from './memberType';

export class EnumMember implements IEnumMember {
  enum: boolean;
  enumMembers: { name: string; value: string | undefined }[];
  name: string;
  startLineNumber: number;

  constructor({ enum: enumValue, enumMembers, name, startLineNumber }: Partial<IEnumMember> = {}) {
    this.enum = enumValue ?? true; // 默认值为 true
    this.enumMembers = enumMembers ?? [{ name: 'UnnamedEnum', value: undefined }]; // 默认值为包含一个成员的数组
    this.name = name ?? 'UnnamedEnum'; // 默认值为 "UnnamedEnum"
    this.startLineNumber = startLineNumber ?? 0; // 默认值为 0
  }

  setEnum(enumValue: boolean): this {
    this.enum = enumValue;
    return this;
  }

  setEnumMembers(enumMembersValue: { name: string; value: string | undefined }[]): this {
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
