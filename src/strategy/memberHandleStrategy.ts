
import { MemberDeclaration } from "../ast/astHelper"
import { Member } from "../parser/member"


export interface MemberHandleStrategy {
  handleClass(memberDeclaration: MemberDeclaration): Member | null
  handleMethod(memberDeclaration: MemberDeclaration): Member | null
  handleProperty(memberDeclaration: MemberDeclaration): Member | null
  handleEnum(memberDeclaration: MemberDeclaration): Member | null
  handleTypedef(memberDeclaration: MemberDeclaration): Member | null
  handleInterface(memberDeclaration: MemberDeclaration): Member | null
}







