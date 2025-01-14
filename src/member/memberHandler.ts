import { ClassDeclaration, ConstructorDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph";
import { MemberDeclaration } from "../ast/astHelper";
import { Member } from "../parser/member";
import { MemberHandleStrategy } from "../member/memberHandleStrategy";


export interface MemberHandler {
  setNext(memberHandler: MemberHandler): MemberHandler;
  handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null>;
  batchHandle(memberDeclarations: Array<MemberDeclaration>, memberHandleStrategy: MemberHandleStrategy): Promise<Array<Member | null>>
}

export abstract class AbstractMemberHandler implements MemberHandler {
  protected nextMemberHandler: MemberHandler | null = null
  setNext(memberHandler: MemberHandler): MemberHandler {
    this.nextMemberHandler = memberHandler
    return memberHandler
  }
  abstract handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null>;
  // abstract handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null;
  async batchHandle(declarations: Array<MemberDeclaration>, strategy: MemberHandleStrategy): Promise<Array<Member | null>> {
    const promises = declarations.map(declaration => this.handle(declaration, strategy));
    return Promise.all(promises);
  }
}

export class ClassMemberHandler extends AbstractMemberHandler {
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是类声明，则处理
    if (memberDeclaration instanceof ClassDeclaration) return memberHandleStrategy.handleClass(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
}

export class MethodMemberHandler extends AbstractMemberHandler {
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是方法声明，则处理
    if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration || memberDeclaration instanceof ConstructorDeclaration) return memberHandleStrategy.handleMethod(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }

}

export class PropertyMemberHandler extends AbstractMemberHandler {
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是方法声明，则处理
    if (memberDeclaration instanceof PropertyDeclaration) return memberHandleStrategy.handleProperty(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
}


export class EnumMemberHandler extends AbstractMemberHandler {
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是枚举声明，则处理
    if (memberDeclaration instanceof EnumDeclaration) return memberHandleStrategy.handleEnum(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是枚举声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
}

export class InterfaceMemberHandler extends AbstractMemberHandler {
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是接口声明，则处理
    if (memberDeclaration instanceof InterfaceDeclaration) return memberHandleStrategy.handleInterface(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是接口声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
}

export class TypedefMemberHandler extends AbstractMemberHandler {

  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是类声明，则处理
    if (memberDeclaration instanceof TypeAliasDeclaration) return memberHandleStrategy.handleTypedef(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
}