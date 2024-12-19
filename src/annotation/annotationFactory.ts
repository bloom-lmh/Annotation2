import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph";
import { ClassAnnotationConfig, Config, MethodAnnotationConfig, PropertyAnnotationConfig } from "../config/config";
import { AstUtil, MemberDeclaration } from "../utils/astUtil";
import { ClassAnnotation, EnumAnnotation, InterfaceAnnotation, MethodAnnotation, PropertyAnnotation, TypedefAnnotation } from "./annotation";

/**
 * 注解工厂
 */
export class AnnotationFactory {
    // 根据成员声明信息和配置生成注解
    public static getAnnotation(memberDeclaration: MemberDeclaration, config: Config) {
        // 解析配置
        let { classAnnotationConfig, methodAnnotationConfig, propertyAnnotationConfig, globalAnnotationConfig, translateConfig } = config
        // 获取方法名
        const memberName = memberDeclaration?.getName() || ""
        // 若是方法，创建方法注释对象
        if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration) {

            // 获取方法参数
            const params = memberDeclaration.getParameters().map(param => {
                return [param.getName(), param.getType().getText()]
            })
            // 获取方法返回值
            const returnType = memberDeclaration.getReturnType().getText()
            // 获取方法抛出异常
            const throws = AstUtil.getMethodThrows(memberDeclaration)
            // 获取方法是否异步
            const async = !!memberDeclaration.getAsyncKeyword()?.getText()
            // 获取方法访问控制信息
            let access = ""
            memberDeclaration.getModifiers().forEach(modifier => {
                if (modifier.getText()) {
                    access = modifier.getText()
                }
            })
            // 创建注解并返回
            return new MethodAnnotation()
                .setNameTag(memberName)
                .setParamsTag(params)
                .setReturnsTag(returnType)
                .setAsyncTag(async)
                .setAccessTag(access)
                .setThrowsTag(throws)
        }
        // 若是属性，创建属性注释对象
        if (memberDeclaration instanceof PropertyDeclaration) {
            // 获取属性参数
            const type = memberDeclaration.getType().getText()
            // 获取默认值
            const defaultValue = memberDeclaration.getInitializer()?.getText() || "";
            // 获取访问权限修饰符
            let access = ""
            memberDeclaration.getModifiers().forEach(modifier => {
                if (modifier.getText() && modifier.getText() !== "static") {
                    access = modifier.getText()
                }
            })
            // 获取是否静态变量
            const staticTag = memberDeclaration.isStatic()
            // 创建属性注解并返回
            return new PropertyAnnotation()
                .setNameTag(memberName)
                .setTypeTag(type)
                .setAccessTag(access)
                .setStaticTag(staticTag)
                .setDefaultTag(defaultValue)
        }
        // 若是类，创建类注释对象
        if (memberDeclaration instanceof ClassDeclaration) {
            // 获取抽象标志
            const abstract = memberDeclaration.isAbstract()
            // 获取继承的类名
            const extendsTag = memberDeclaration.getExtends()?.getText() || ""
            // 获取实现的接口
            const implementsTag = memberDeclaration.getImplements().map(implement => {
                return implement.getText()
            })

            return new ClassAnnotation()
                .setNameTag(memberName)
                .setAbstract(abstract)
                .setExtendsTag(extendsTag)
                .setImplementsTag(implementsTag)
        }
        // 若是枚举，创建枚举注释对象
        if (memberDeclaration instanceof EnumDeclaration) {
            // 创建枚举注解对象
            return new EnumAnnotation()
                .setNameTag(memberName)
        }
        // 若是接口，创建接口注释对象
        if (memberDeclaration instanceof InterfaceDeclaration) {
            return new InterfaceAnnotation()
                .setNameTag(memberName)
        }

        // 若是自定义类型，创建自定义类型注释对象
        if (memberDeclaration instanceof TypeAliasDeclaration) {
            // 获取类型
            const type = memberDeclaration.getType()
            let typeName = ""
            // 获取类型名
            if (type.isUnion()) {
                const typeArr = type.getUnionTypes().map((unionType) => {
                    return unionType.getText()
                });
                typeName = typeArr.join("|")
            } else {
                typeName = type.getText()
            }
            // 返回自定义类型注解对象
            return new TypedefAnnotation()
                .setNameTag(memberName)
                .setTypeTag(typeName)
        }
    }
}