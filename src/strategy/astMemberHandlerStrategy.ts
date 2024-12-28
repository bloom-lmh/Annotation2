import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph"
import { AstHelper, MemberDeclaration } from "../ast/astHelper"
import { ClassMember, EnumMember, InterfaceMember, Member, MethodMember, PropertyMember, TypedefMember } from "../parser/member"
import { MemberHandleStrategy } from "./memberHandleStrategy"

export class AstMemberHandleStrategy implements MemberHandleStrategy {

  handleClass(memberDeclaration: MemberDeclaration): Member | null {
    memberDeclaration = (memberDeclaration as ClassDeclaration)
    // 成员名
    const _name = memberDeclaration?.getName()
    // 获取抽象标志
    const _abstract = memberDeclaration?.isAbstract()
    // 获取继承的类名
    const _extends = memberDeclaration.getExtends()?.getText()
    // 获取实现的接口
    const _implements = memberDeclaration.getImplements().map(implement => {
      return implement.getText()
    })
    return new ClassMember(_name, true, _abstract, _extends, _implements)
  }
  handleMethod(memberDeclaration: MemberDeclaration): Member | null {
    memberDeclaration = (memberDeclaration as MethodDeclaration | FunctionDeclaration)
    // 成员名
    const _name = memberDeclaration?.getName()
    // 获取方法参数
    const _params = memberDeclaration.getParameters().map(param => {
      return [param.getName(), param.getType().getText()]
    })
    // 获取方法返回值
    const _returns = memberDeclaration.getReturnType().getText()
    // 获取方法抛出异常
    const _throws = AstHelper.getMethodThrows(memberDeclaration)
    // 获取方法是否异步
    const _async = !!memberDeclaration.getAsyncKeyword()?.getText()
    // 获取方法访问控制信息
    const _access = AstHelper.getModefier(memberDeclaration)
    // 返回方法成员
    // todo 判断static
    return new MethodMember(_name, _async, true, false, _throws, _params, _returns, true, _access)

  }
  handleProperty(memberDeclaration: MemberDeclaration): Member | null {
    memberDeclaration = (memberDeclaration as PropertyDeclaration)
    // 成员名
    const _name = memberDeclaration?.getName()
    // 获取属性参数
    const _type = memberDeclaration.getType().getText()
    // 获取默认值
    const _default = memberDeclaration.getInitializer()?.getText()
    // 获取访问权限修饰符
    const _access = AstHelper.getModefier(memberDeclaration)
    // 获取是否静态变量
    const _static = memberDeclaration.isStatic()
    // 返回属性成员
    return new PropertyMember(_name, true, _type, _static, _default)

  }
  handleInterface(memberDeclaration: MemberDeclaration): Member | null {
    memberDeclaration = (memberDeclaration as InterfaceDeclaration)
    // 成员名
    const _name = memberDeclaration?.getName()
    // 返回接口成员
    return new InterfaceMember(_name, true)
  }
  handleEnum(memberDeclaration: MemberDeclaration): Member | null {
    memberDeclaration = (memberDeclaration as EnumDeclaration)
    // 成员名
    const _name = memberDeclaration?.getName()
    // 返回接口成员
    return new EnumMember(_name, true)
  }
  handleTypedef(memberDeclaration: MemberDeclaration): Member | null {
    memberDeclaration = (memberDeclaration as TypeAliasDeclaration)
    // 成员名
    const _name = memberDeclaration?.getName()
    // 类型
    const _type = AstHelper.getType(memberDeclaration)
    // 返回接口成员
    return new TypedefMember(_name, true, _type)
  }


}