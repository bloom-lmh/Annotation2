import { MemberDeclaration, MemberDeclarations } from '../ast/astHelper';
import { IMember } from '../member/memberType';
import { MemberHandleStrategy } from '../memberHandleStrategy/memberHandleStrategy';
import { ClassMemberHandler } from './classMemberHandler';
import { EnumMemberHandler } from './enumMemberHandler';
import { InterfaceMemberHandler } from './interfaceMemberHandler';
import { MemberHandler } from './memberHandler';
import { MethodMemberHandler } from './methodMemberHandler';
import { PropertyMemberHandler } from './propertyMemberHandler';
import { TypedefMemberHandler } from './typedefMemberHandler';

export class MemberHandlerChain implements MemberHandler {
  private memberHandlerChain: MemberHandler;

  constructor() {
    this.memberHandlerChain = new ClassMemberHandler();
    this.memberHandlerChain
      .setNext(new MethodMemberHandler())
      .setNext(new PropertyMemberHandler())
      .setNext(new EnumMemberHandler())
      .setNext(new TypedefMemberHandler())
      .setNext(new InterfaceMemberHandler());
  }
  setNext(memberHandler: MemberHandler): MemberHandler {
    if (!this.memberHandlerChain) {
      this.memberHandlerChain = memberHandler;
    }
    return this.memberHandlerChain.setNext(memberHandler);
  }

  async handle(
    memberDeclaration: MemberDeclaration,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<IMember | null> {
    const result = await this.memberHandlerChain.handle(memberDeclaration, memberHandleStrategy);
    if (result && memberDeclaration) {
      // 获取开始行并设置
      result.setStartLineNumber(memberDeclaration.getStartLineNumber() - 1);
    }
    return result;
  }
  async batchHandle(
    memberDeclarations: Array<MemberDeclaration>,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<Array<IMember | null>> {
    const members = memberDeclarations.map(memberDeclaration => {
      return this.handle(memberDeclaration, memberHandleStrategy);
    });
    const results = await Promise.all(members);
    return results;
  }

  async batchHandleAll(
    memberDeclarations: MemberDeclarations,
    memberHandleStrategy: MemberHandleStrategy,
  ): Promise<(IMember | null)[]> {
    const {
      interfaces,
      classes,
      typeAliases,
      enums,
      functions,
      constructors,
      methods,
      properties,
    } = memberDeclarations;
    // 并行处理所有类别
    const promises = [
      this.batchHandle(interfaces, memberHandleStrategy),
      this.batchHandle(classes, memberHandleStrategy),
      this.batchHandle(typeAliases, memberHandleStrategy),
      this.batchHandle(enums, memberHandleStrategy),
      this.batchHandle(functions, memberHandleStrategy),
      this.batchHandle(constructors, memberHandleStrategy),
      this.batchHandle(methods, memberHandleStrategy),
      this.batchHandle(properties, memberHandleStrategy),
    ];

    // 等待所有类别处理完成
    const results = await Promise.all(promises);

    // 展平结果
    return results.flatMap(memberArray => memberArray);
  }
}
