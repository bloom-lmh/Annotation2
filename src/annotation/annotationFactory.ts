import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph";
import { ClassAnnotationConfig, Config, EnumAnnotationConfig, GlobalAnnotationConfig, InterfaceAnnotationConfig, MethodAnnotationConfig, PropertyAnnotationConfig, TypedefAnnotationConfig } from "../config/config";
import { AstUtil, MemberDeclaration } from "../utils/astUtil";
import { ClassAnnotation, EnumAnnotation, InterfaceAnnotation, MethodAnnotation, PropertyAnnotation, TypedefAnnotation } from "./annotation";

/**
 * 注解工厂
 */
export class AnnotationFactory {
    // 根据成员声明信息和配置生成注解
    public static getAnnotation(memberDeclaration: MemberDeclaration, config: Config) {
        // 解析配置
        let { classAnnotationConfig, methodAnnotationConfig, propertyAnnotationConfig, enumAnnotationConfig, globalAnnotationConfig, interfaceAnnotationConfig, typedefAnnotationConfig, translateConfig } = config
        globalAnnotationConfig = globalAnnotationConfig || new GlobalAnnotationConfig()
        // 若是方法，创建方法注释对象
        if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration) {
            methodAnnotationConfig = methodAnnotationConfig || new MethodAnnotationConfig()
            return new MethodAnnotation(globalAnnotationConfig, methodAnnotationConfig, memberDeclaration)
        }
        // 若是属性，创建属性注释对象
        if (memberDeclaration instanceof PropertyDeclaration) {
            propertyAnnotationConfig = propertyAnnotationConfig || new PropertyAnnotationConfig()
            return new PropertyAnnotation(globalAnnotationConfig, propertyAnnotationConfig, memberDeclaration)
        }
        // 若是类，创建类注释对象
        if (memberDeclaration instanceof ClassDeclaration) {
            classAnnotationConfig = classAnnotationConfig || new ClassAnnotationConfig()
            return new ClassAnnotation(globalAnnotationConfig, classAnnotationConfig, memberDeclaration)
        }
        // 若是枚举，创建枚举注释对象
        if (memberDeclaration instanceof EnumDeclaration) {
            enumAnnotationConfig = enumAnnotationConfig || new EnumAnnotationConfig()
            return new EnumAnnotation(globalAnnotationConfig, enumAnnotationConfig, memberDeclaration)
        }
        // 若是接口，创建接口注释对象
        if (memberDeclaration instanceof InterfaceDeclaration) {
            interfaceAnnotationConfig = interfaceAnnotationConfig || new InterfaceAnnotationConfig()
            return new InterfaceAnnotation(globalAnnotationConfig, interfaceAnnotationConfig, memberDeclaration)
        }

        // 若是自定义类型，创建自定义类型注释对象
        if (memberDeclaration instanceof TypeAliasDeclaration) {
            typedefAnnotationConfig = typedefAnnotationConfig || new TypedefAnnotationConfig()
            return new TypedefAnnotation(globalAnnotationConfig, typedefAnnotationConfig, memberDeclaration)
        }
    }
}