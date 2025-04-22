import { MemberDeclaration } from '../ast/astHelper';
import { IMember } from '../member/memberType';
import { MemberHandleStrategy } from '../memberHandleStrategy/memberHandleStrategy';

export interface MemberHandler {
  setNext(memberHandler: MemberHandler): MemberHandler;
  handle(
    memberDeclaration: MemberDeclaration,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<IMember | null>;
  batchHandle(
    memberDeclarations: Array<MemberDeclaration>,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<Array<IMember | null>>;
}
