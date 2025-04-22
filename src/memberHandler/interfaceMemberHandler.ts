import { InterfaceDeclaration } from 'ts-morph';
import { MemberDeclaration } from '../ast/astHelper';
import { MemberHandleStrategy } from '../memberHandleStrategy/memberHandleStrategy';
import { AbstractMemberHandler } from './abstractMemberHandler';
import { IMember } from '../member/memberType';

export class InterfaceMemberHandler extends AbstractMemberHandler {
  async handle(
    memberDeclaration: MemberDeclaration,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<IMember | null> {
    // 若是接口声明，则处理
    if (memberDeclaration instanceof InterfaceDeclaration)
      return memberHandleStrategy.handleInterface(memberDeclaration);
    // 返回空
    if (!this.nextMemberHandler) return null;
    // 若成员声明不是接口声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
}
