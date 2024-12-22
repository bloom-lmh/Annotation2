import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph";
import { AstHelper, MemberDeclaration } from "../ast/astHelper";
import { ClassMember, InterfaceMember, MemberType, MethodMember, EnumMember, PropertyMember, TypedefMember } from "./member";
import { TextDocument } from "vscode";
/**
 * 抽象语法树解析器
 */
export class AstParseStrategy {
    public parseMember(memberDeclaration: MemberDeclaration): MemberType | null {
        // 若是方法，创建方法注释对象
        if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration) {
            return this.parseMethod(memberDeclaration)
        }
        // 若是属性，创建属性注释对象
        if (memberDeclaration instanceof PropertyDeclaration) {
            return this.parseProperty(memberDeclaration)
        }
        // 若是类，创建类注释对象
        if (memberDeclaration instanceof ClassDeclaration) {
            return this.parseClass(memberDeclaration)
        }
        // 若是枚举，创建枚举注释对象
        if (memberDeclaration instanceof EnumDeclaration) {
            return this.parseEnum(memberDeclaration)
        }
        // 若是接口，创建接口注释对象
        if (memberDeclaration instanceof InterfaceDeclaration) {
            return this.parseInterface(memberDeclaration)
        }

        // 若是自定义类型，创建自定义类型注释对象
        if (memberDeclaration instanceof TypeAliasDeclaration) {
            return this.parseTypedef(memberDeclaration)
        }
        return null
    }
    /**
    * 解析类
    */
    protected parseClass(memberDeclaration: MemberDeclaration): ClassMember {
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
    /**
     * 解析方法
     */
    protected parseMethod(memberDeclaration: MemberDeclaration): MethodMember {
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
        return new MethodMember(_name, _async, true, _throws, _params, _returns, true, _access)
    }

    /**
     * 解析属性
     */
    protected parseProperty(memberDeclaration: MemberDeclaration): PropertyMember | MethodMember {
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

    /**
     * 解析接口
     */
    protected parseInterface(memberDeclaration: MemberDeclaration): InterfaceMember {
        memberDeclaration = (memberDeclaration as InterfaceDeclaration)
        // 成员名
        const _name = memberDeclaration?.getName()
        // 返回接口成员
        return new InterfaceMember(_name, true)
    }

    /**
     * 解析枚举
     */
    protected parseEnum(memberDeclaration: MemberDeclaration): EnumMember {
        memberDeclaration = (memberDeclaration as EnumDeclaration)
        // 成员名
        const _name = memberDeclaration?.getName()
        // 返回接口成员
        return new EnumMember(_name, true)
    }

    /**
     * 解析自定义类
     */
    protected parseTypedef(memberDeclaration: MemberDeclaration): TypedefMember {
        memberDeclaration = (memberDeclaration as TypeAliasDeclaration)
        // 成员名
        const _name = memberDeclaration?.getName()
        // 类型
        const _type = AstHelper.getType(memberDeclaration)
        // 返回接口成员
        return new TypedefMember(_name, true, _type)
    }

}