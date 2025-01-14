import { ClassDeclaration, ConstructorDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph";
import { MemberDeclaration } from "../ast/astHelper";
import { Member } from "../parser/member";
import { MemberHandleStrategy } from "../member/memberHandleStrategy";


export interface MemberHandler {
  setNext(memberHandler: MemberHandler): MemberHandler;
  handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null>;
  //handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null;
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

  /*  handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null {
     // 若是类声明，则处理
     if (memberDeclaration instanceof ClassDeclaration) return memberHandleStrategy.handleClass(memberDeclaration)
     // 返回空
     if (!this.nextMemberHandler) return null
     // 若成员声明不是类声明，且有下一个直接交给下一个处理
     return this.nextMemberHandler.handleSync(memberDeclaration, memberHandleStrategy);
   } */
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是类声明，则处理
    if (memberDeclaration instanceof ClassDeclaration) return memberHandleStrategy.handleClass(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
  /*  async batchHandle(memberDeclarations: Array<MemberDeclaration>, memberHandleStrategy: MemberHandleStrategy): Promise<Array<Member | null>> {
     if (memberDeclarations && memberDeclarations.length > 0) {
       if (memberDeclarations[0] instanceof ClassDeclaration) {
         return memberDeclarations.map(memberDeclaration => {
           return memberHandleStrategy.handleClass(memberDeclaration)
         })
       }
     }
     return []
   } */
}

export class MethodMemberHandler extends AbstractMemberHandler {

  /*  handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null {
     // 若是方法声明，则处理
     if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration || memberDeclaration instanceof ConstructorDeclaration) return memberHandleStrategy.handleMethod(memberDeclaration)
     // 返回空
     if (!this.nextMemberHandler) return null
     // 若成员声明不是类声明，且有下一个直接交给下一个处理
     return this.nextMemberHandler.handleSync(memberDeclaration, memberHandleStrategy);
   } */
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是方法声明，则处理
    if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration || memberDeclaration instanceof ConstructorDeclaration) return memberHandleStrategy.handleMethod(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
  /*   async batchHandle(memberDeclarations: Array<MemberDeclaration>, memberHandleStrategy: MemberHandleStrategy): Promise<Array<Member | null>> {
      if (memberDeclarations && memberDeclarations.length > 0) {
        let firstMemberDeclaration = memberDeclarations[0]
        if (firstMemberDeclaration instanceof MethodDeclaration || firstMemberDeclaration instanceof FunctionDeclaration || firstMemberDeclaration instanceof ConstructorDeclaration) {
          return memberDeclarations.map(memberDeclaration => {
            return memberHandleStrategy.handleMethod(memberDeclaration)
          })
        }
      }
      return []
    } */
}

export class PropertyMemberHandler extends AbstractMemberHandler {
  /*  handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null {
     // 若是方法声明，则处理
     if (memberDeclaration instanceof PropertyDeclaration) return memberHandleStrategy.handleProperty(memberDeclaration)
     // 返回空
     if (!this.nextMemberHandler) return null
     // 若成员声明不是类声明，且有下一个直接交给下一个处理
     return this.nextMemberHandler.handleSync(memberDeclaration, memberHandleStrategy);
   } */
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是方法声明，则处理
    if (memberDeclaration instanceof PropertyDeclaration) return memberHandleStrategy.handleProperty(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
  /*  async batchHandle(memberDeclarations: Array<MemberDeclaration>, memberHandleStrategy: MemberHandleStrategy): Promise<Array<Member | null>> {
     if (memberDeclarations && memberDeclarations.length > 0) {
       if (memberDeclarations[0] instanceof PropertyDeclaration) {
         return memberDeclarations.map(memberDeclaration => {
           return memberHandleStrategy.handleProperty(memberDeclaration)
         })
       }
     }
     return []
   } */
}


export class EnumMemberHandler extends AbstractMemberHandler {

  /*  handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null {
     // 若是枚举声明，则处理
     if (memberDeclaration instanceof EnumDeclaration) return memberHandleStrategy.handleEnum(memberDeclaration)
     // 返回空
     if (!this.nextMemberHandler) return null
     // 若成员声明不是枚举声明，且有下一个直接交给下一个处理
     return this.nextMemberHandler.handleSync(memberDeclaration, memberHandleStrategy);
   } */
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是枚举声明，则处理
    if (memberDeclaration instanceof EnumDeclaration) return memberHandleStrategy.handleEnum(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是枚举声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
  /* async batchHandle(memberDeclarations: Array<MemberDeclaration>, memberHandleStrategy: MemberHandleStrategy): Promise<Array<Member | null>> {
    if (memberDeclarations && memberDeclarations.length > 0) {
      if (memberDeclarations[0] instanceof EnumDeclaration) {
        return memberDeclarations.map(memberDeclaration => {
          return memberHandleStrategy.handleEnum(memberDeclaration)
        })
      }
    }
    return []
  } */
}

export class InterfaceMemberHandler extends AbstractMemberHandler {

  /*  handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null {
     // 若是接口声明，则处理
     if (memberDeclaration instanceof InterfaceDeclaration) return memberHandleStrategy.handleInterface(memberDeclaration)
     // 返回空
     if (!this.nextMemberHandler) return null
     // 若成员声明不是接口声明，且有下一个直接交给下一个处理
     return this.nextMemberHandler.handleSync(memberDeclaration, memberHandleStrategy);
   } */
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是接口声明，则处理
    if (memberDeclaration instanceof InterfaceDeclaration) return memberHandleStrategy.handleInterface(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是接口声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
  /*  async batchHandle(memberDeclarations: Array<MemberDeclaration>, memberHandleStrategy: MemberHandleStrategy): Promise<Array<Member | null>> {
     if (memberDeclarations && memberDeclarations.length > 0) {
       if (memberDeclarations[0] instanceof InterfaceDeclaration) {
         return memberDeclarations.map(memberDeclaration => {
           return memberHandleStrategy.handleInterface(memberDeclaration)
         })
       }
     }
     return []
   } */
}

export class TypedefMemberHandler extends AbstractMemberHandler {

  /*  handleSync(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Member | null {
     // 若是自定义类型声明，则处理
     if (memberDeclaration instanceof TypeAliasDeclaration) return memberHandleStrategy.handleTypedef(memberDeclaration)
     // 返回空
     if (!this.nextMemberHandler) return null
     // 若成员声明不是接口声明，且有下一个直接交给下一个处理
     return this.nextMemberHandler.handleSync(memberDeclaration, memberHandleStrategy);
   } */
  async handle(memberDeclaration: MemberDeclaration, memberHandleStrategy: MemberHandleStrategy): Promise<Member | null> {
    // 若是类声明，则处理
    if (memberDeclaration instanceof TypeAliasDeclaration) return memberHandleStrategy.handleClass(memberDeclaration)
    // 返回空
    if (!this.nextMemberHandler) return null
    // 若成员声明不是类声明，且有下一个直接交给下一个处理
    return this.nextMemberHandler.handle(memberDeclaration, memberHandleStrategy);
  }
  /* async batchHandle(memberDeclarations: Array<MemberDeclaration>, memberHandleStrategy: MemberHandleStrategy): Promise<Array<Member | null>> {
    if (memberDeclarations && memberDeclarations.length > 0) {
      if (memberDeclarations[0] instanceof TypeAliasDeclaration) {
        return memberDeclarations.map(memberDeclaration => {
          return memberHandleStrategy.handleClass(memberDeclaration)
        })
      }
    }
    return []
  } */
}