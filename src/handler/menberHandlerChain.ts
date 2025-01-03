import { MemberDeclaration } from "../ast/astHelper"
import { Member } from "../parser/member"
import { MemberHandleStrategy } from "../strategy/memberHandleStrategy"
import { ClassMemberHandler, EnumMemberHandler, InterfaceMemberHandler, MemberHandler, MethodMemberHandler, PropertyMemberHandler, TypedefMemberHandler } from "./memberHandler"

export class MemberHandlerChain implements MemberHandler {
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
}