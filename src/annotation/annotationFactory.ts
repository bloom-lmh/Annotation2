import { ClassDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration } from "ts-morph";
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
        // 获取成员名
        const memberName = memberDeclaration?.getName()
        console.log(memberName);

        // 若是类，创建类注释对象
        if (memberDeclaration instanceof ClassDeclaration) {
            // 处理配置
            if (!classAnnotationConfig) {
                classAnnotationConfig = Object.assign({}, globalAnnotationConfig, classAnnotationConfig) || new ClassAnnotationConfig()
            }
            // 解构配置
            const { abstractTag, extendsTag } = classAnnotationConfig
            // 抽象类标志
            const isAbstract = !!memberDeclaration.getAbstractKeyword()?.getText() && abstractTag;
            // 继承的父类
            const extendInfo = extendsTag ? memberDeclaration.getExtends()?.getText() : ''
            // 获取泛型

            // 获取构造器参数
            // 获取实现的接口
            // 获取
            // 是否构造函数
            console.log(isAbstract, extendInfo);
        }
        // 若是方法，创建方法注释对象
        if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration) {
            // 处理配置
            if (!methodAnnotationConfig) {
                methodAnnotationConfig = Object.assign({}, globalAnnotationConfig, methodAnnotationConfig) || new MethodAnnotationConfig()
            }

        }
        // 若是属性，创建属性注释对象
        if (memberDeclaration instanceof PropertyDeclaration) {
            // 处理配置
            if (!propertyAnnotationConfig) {
                propertyAnnotationConfig = Object.assign({}, globalAnnotationConfig, propertyAnnotationConfig) || new PropertyAnnotationConfig()
            }

        }
    }
}