import { ClassDeclaration, FunctionDeclaration, MethodDeclaration, PropertyDeclaration } from "ts-morph";
import { Config } from "../config/config";
import { MemberDeclaration } from "../utils/astUtil";
import { BaseAnnotation, ClassAnnotation, MethodAnnotation, PropertyAnnotation } from "./annotation";
import { ClassAnnotationDirector, MethodAnnotationDirector, PropertyAnnotationDirector } from "./annotationDirector";
import { ClassAnnotationBuilder, MethodAnnotationBuilder, PropertyAnnotationBuilder } from "./annotationBuilder";

/**
 * 注解工厂
 */
export class AnnotationFactory {
    // 根据成员声明信息和配置生成注解
    public static getAnnotation(memberDeclaration: MemberDeclaration, config: Config) {
        // 若是类，创建类注释对象
        if (memberDeclaration instanceof ClassDeclaration) {
            // 创建类注解建造者
            const classAnnotationBuilder = new ClassAnnotationBuilder(new ClassAnnotation())
            // 闯将指挥者
            const classAnnotationDirector = new ClassAnnotationDirector()
            // 建造注解并返回
            return classAnnotationDirector.constructAnnotationByContext(classAnnotationBuilder, memberDeclaration, config)
        }
        // 若是方法，创建方法注释对象
        if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration) {
            // 创建类注解建造者
            const methodAnnotationBuilder = new MethodAnnotationBuilder(new MethodAnnotation())
            // 闯将指挥者
            const methodAnnotationDirector = new MethodAnnotationDirector()
            // 建造注解并返回
            return methodAnnotationDirector.constructAnnotationByContext(methodAnnotationBuilder, memberDeclaration, config)
        }
        // 若是属性，创建属性注释对象
        if (memberDeclaration instanceof PropertyDeclaration) {
            // 创建类注解建造者
            const propertyAnnotationBuilder = new PropertyAnnotationBuilder(new PropertyAnnotation())
            // 闯将指挥者
            const propertyAnnotationDirector = new PropertyAnnotationDirector()
            // 建造注解并返回
            return propertyAnnotationDirector.constructAnnotationByContext(propertyAnnotationBuilder, memberDeclaration, config)
        }
    }
}