import { ClassAnnotationConfig, Config, EnumAnnotationConfig, GlobalAnnotationConfig, InterfaceAnnotationConfig, MethodAnnotationConfig, PropertyAnnotationConfig, TypedefAnnotationConfig } from "../config/config";
import { ClassAnnotation, EnumAnnotation, InterfaceAnnotation, MethodAnnotation, PropertyAnnotation, TypedefAnnotation } from "./annotation";
import { ClassMember, EnumMember, InterfaceMember, Member, MethodMember, PropertyMember, TypedefMember } from "../parser/member";

/**
 * 注解工厂
 */
export class AnnotationFactory {
    // 根据成员声明信息和配置生成注解
    public static getAnnotation(member: Member, config: Config) {
        // 解析配置
        let { classAnnotationConfig, methodAnnotationConfig, propertyAnnotationConfig, enumAnnotationConfig, globalAnnotationConfig, interfaceAnnotationConfig, typedefAnnotationConfig, translateConfig } = config
        globalAnnotationConfig = globalAnnotationConfig || new GlobalAnnotationConfig()
        // 若是方法，创建方法注释对象
        if (member instanceof MethodMember) {
            methodAnnotationConfig = methodAnnotationConfig || new MethodAnnotationConfig()
            return new MethodAnnotation(globalAnnotationConfig, methodAnnotationConfig, member)
        }
        // 若是属性，创建属性注释对象
        if (member instanceof PropertyMember) {
            propertyAnnotationConfig = propertyAnnotationConfig || new PropertyAnnotationConfig()
            return new PropertyAnnotation(globalAnnotationConfig, propertyAnnotationConfig, member)
        }
        // 若是类，创建类注释对象
        if (member instanceof ClassMember) {
            classAnnotationConfig = classAnnotationConfig || new ClassAnnotationConfig()
            return new ClassAnnotation(globalAnnotationConfig, classAnnotationConfig, member)
        }
        // 若是枚举，创建枚举注释对象
        if (member instanceof EnumMember) {
            enumAnnotationConfig = enumAnnotationConfig || new EnumAnnotationConfig()
            return new EnumAnnotation(globalAnnotationConfig, enumAnnotationConfig, member)
        }
        // 若是接口，创建接口注释对象
        if (member instanceof InterfaceMember) {
            interfaceAnnotationConfig = interfaceAnnotationConfig || new InterfaceAnnotationConfig()
            return new InterfaceAnnotation(globalAnnotationConfig, interfaceAnnotationConfig, member)
        }

        // 若是自定义类型，创建自定义类型注释对象
        if (member instanceof TypedefMember) {
            typedefAnnotationConfig = typedefAnnotationConfig || new TypedefAnnotationConfig()
            return new TypedefAnnotation(globalAnnotationConfig, typedefAnnotationConfig, member)
        }
    }
}