import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph";
import { ClassAnnotationConfig, Config, MethodAnnotationConfig, PropertyAnnotationConfig } from "../config/config";
import { MemberDeclaration } from "../utils/astUtil";

/**
 * 注解工厂
 */
export class AnnotationFactory {
    // 根据成员声明信息和配置生成注解
    public static getAnnotation(memberDeclaration: MemberDeclaration, config: Config) {
        // 解析配置
        let { classAnnotationConfig, methodAnnotationConfig, propertyAnnotationConfig, globalAnnotationConfig, translateConfig } = config
        // 若是方法，创建方法注释对象
        if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration) {
            console.log("e");

        }
        // 若是属性，创建属性注释对象
        if (memberDeclaration instanceof PropertyDeclaration) {
            console.log("f");

        }
        // 若是类，创建类注释对象
        if (memberDeclaration instanceof ClassDeclaration) {
            console.log("d");

        }
        // 若是枚举，创建枚举注释对象
        if (memberDeclaration instanceof EnumDeclaration) {
            console.log("a");

        }
        // 若是接口，创建接口注释对象
        if (memberDeclaration instanceof InterfaceDeclaration) {
            console.log("b");

        }

        // 若是自定义类型，创建自定义类型注释对象
        if (memberDeclaration instanceof TypeAliasDeclaration) {
            console.log("c");
        }
    }
}