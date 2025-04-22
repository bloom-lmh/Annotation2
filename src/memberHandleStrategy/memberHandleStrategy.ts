import { MemberDeclaration } from '../ast/astHelper';
import { IMember } from '../member/memberType';

export interface MemberHandleStrategy {
  handleClass(memberDeclaration: MemberDeclaration): IMember | null;
  handleMethod(memberDeclaration: MemberDeclaration): IMember | null;
  handleProperty(memberDeclaration: MemberDeclaration): IMember | null;
  handleEnum(memberDeclaration: MemberDeclaration): IMember | null;
  handleTypedef(memberDeclaration: MemberDeclaration): IMember | null;
  handleInterface(memberDeclaration: MemberDeclaration): IMember | null;
}
