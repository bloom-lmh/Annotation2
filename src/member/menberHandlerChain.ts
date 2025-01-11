import { MemberDeclaration } from "../ast/astHelper"
import { Member } from "../parser/member"
import { MemberHandleStrategy } from "../member/memberHandleStrategy"
import { BatchMemberHandler, ClassMemberHandler, EnumMemberHandler, InterfaceMemberHandler, MemberHandler, MethodMemberHandler, PropertyMemberHandler, TypedefMemberHandler } from "./memberHandler"

export class MemberHandlerChain implements MemberHandler, BatchMemberHandler {
  private memberHandlerChain: MemberHandler

  constructor() {
    this.memberHandlerChain = new ClassMemberHandler()
    this.memberHandlerChain
      .setNext(new MethodMemberHandler())
      .setNext(new PropertyMemberHandler())
      .setNext(new EnumMemberHandler())
      .setNext(new TypedefMemberHandler())
      .setNext(new InterfaceMemberHandler())
  }
  setNext(memberHandler: MemberHandler): MemberHandler {
    if (!this.memberHandlerChain) {
      this.memberHandlerChain = memberHandler
    }
    return this.memberHandlerChain.setNext(memberHandler)
  }

  handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null {
    return this.memberHandlerChain.handle(memberDeclaration, memberHandleStrategy)
  }

  batchHandle(memberDeclarations: Array<MemberDeclaration>, memberHandleStrategy: MemberHandleStrategy): Array<Member | null> {
    const members = memberDeclarations.map(memberDeclaration => {
      return this.memberHandlerChain.handle(memberDeclaration, memberHandleStrategy)
    })
    return members
  }
}