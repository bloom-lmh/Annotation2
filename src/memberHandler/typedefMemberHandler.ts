import { TypeAliasDeclaration } from 'ts-morph';
import { MemberDeclaration } from '../ast/astHelper';
import { MemberHandleStrategy } from '../memberHandleStrategy/memberHandleStrategy';
import { AbstractMemberHandler } from './abstractMemberHandler';
import { IMember } from '../member/memberType';

export class TypedefMemberHandler extends AbstractMemberHandler {
  async handle(
    memberDeclaration: MemberDeclaration,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<IMember | null> {
    // 若是类声明，则处理
    if (memberDeclaration instanceof TypeAliasDeclaration)
      return memberHandleStrategy.handleTypedef(memberDeclaration);
    // 返回空
    if (!this.nextMemberHandler) return null;
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
}
