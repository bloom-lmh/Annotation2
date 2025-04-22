import { MemberDeclaration } from '../ast/astHelper';
import { IMember } from '../member/memberType';
import { MemberHandleStrategy } from '../memberHandleStrategy/memberHandleStrategy';
import { MemberHandler } from './memberHandler';

export abstract class AbstractMemberHandler implements MemberHandler {
  protected nextMemberHandler: MemberHandler | null = null;
  setNext(memberHandler: MemberHandler): MemberHandler {
    this.nextMemberHandler = memberHandler;
    return memberHandler;
  }
  abstract handle(
    memberDeclaration: MemberDeclaration,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<IMember | null>;
  // abstract handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null;
  async batchHandle(
    declarations: Array<MemberDeclaration>,
    strategy: MemberHandleStrategy,
  ): Promise<Array<IMember | null>> {
    const promises = declarations.map(declaration => this.handle(declaration, strategy));
    return Promise.all(promises);
  }
}
