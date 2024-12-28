import { MemberDeclaration } from "../ast/astHelper";
import { Member } from "../parser/member";
import { MemberHandleStrategy } from "../strategy/memberHandleStrategy";

interface MemberHandler {
  setNext(memberHandler: MemberHandler): MemberHandler;
  handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null;
}


abstract class AbstractMemberHandler implements MemberHandler {
  private nextMemberHandler: MemberHandler | null = null
  setNext(memberHandler: MemberHandler): MemberHandler {
    this.nextMemberHandler = memberHandler
    return memberHandler
  }
  abstract handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null
}

class ClassMemberHandler extends AbstractMemberHandler {
  handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null {
    // 尝试进行解析
    return memberHandleStrategy.handleClass(memberDeclaration)

  }
}
