import { PropertyDeclaration } from 'ts-morph';
import { MemberDeclaration } from '../ast/astHelper';
import { AbstractMemberHandler } from './abstractMemberHandler';
import { MemberHandleStrategy } from '../memberHandleStrategy/memberHandleStrategy';
import { IMember } from '../member/memberType';

export class PropertyMemberHandler extends AbstractMemberHandler {
  async handle(
    memberDeclaration: MemberDeclaration,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<IMember | null> {
    // 若是方法声明，则处理
    if (memberDeclaration instanceof PropertyDeclaration) {
      return memberHandleStrategy.handleProperty(memberDeclaration);
    }
    // 返回空
    if (!this.nextMemberHandler) {
      return null;
    }
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
}
