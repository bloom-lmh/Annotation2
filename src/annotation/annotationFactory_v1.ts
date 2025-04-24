import { ClassAnnotationConfig, Config } from '../config/config';
import { EnumAnnotationConfig } from '../config/enumAnnotationConfig';
import { GlobalAnnotationConfig } from '../config/globalAnnotationConfig';
import { InterfaceAnnotationConfig } from '../config/interfaceAnnotationConfig';
import { MethodAnnotationConfig } from '../config/methodAnnotationConfig';
import { PropertyAnnotationConfig } from '../config/propertyAnnotationConfig';
import { TypedefAnnotationConfig } from '../config/typedefAnnotationConfig';
import { ClassMember } from '../member/classMember';
import { EnumMember } from '../member/enumMember';
import { InterfaceMember } from '../member/interfaceMember';
import { IMember } from '../member/memberType';
import { MethodMember } from '../member/methodMember';
import { PropertyMember } from '../member/propertyMember';
import { TypedefMember } from '../member/typedefMember';
import { ClassAnnotation } from './classAnnotation';
import { EnumAnnotation } from './enumAnnotation';
import { InterfaceAnnotation } from './interfaceAnnotation';
import { MethodAnnotation } from './methodAnnotation';
import { PropertyAnnotation } from './propertyAnnotation';
import { TypedefAnnotation } from './typedefAnnotation';

/**
 * 注解工厂
 */
export class AnnotationFactory {
  // 根据成员声明信息和配置生成注解
  public static getAnnotation(member: IMember | null, config: Config) {
    // 解析配置
    let {
      classAnnotationConfig,
      methodAnnotationConfig,
      propertyAnnotationConfig,
      enumAnnotationConfig,
      globalAnnotationConfig,
      interfaceAnnotationConfig,
      typedefAnnotationConfig,
    } = config;
    globalAnnotationConfig = globalAnnotationConfig || new GlobalAnnotationConfig();
    // 若是方法，创建方法注释对象
    if (member instanceof MethodMember) {
      methodAnnotationConfig = methodAnnotationConfig || new MethodAnnotationConfig();
      return new MethodAnnotation(globalAnnotationConfig, methodAnnotationConfig, member);
    }
    // 若是属性，创建属性注释对象
    if (member instanceof PropertyMember) {
      propertyAnnotationConfig = propertyAnnotationConfig || new PropertyAnnotationConfig();
      return new PropertyAnnotation(globalAnnotationConfig, propertyAnnotationConfig, member);
    }
    // 若是类，创建类注释对象
    if (member instanceof ClassMember) {
      classAnnotationConfig = classAnnotationConfig || new ClassAnnotationConfig();
      return new ClassAnnotation(globalAnnotationConfig, classAnnotationConfig, member);
    }
    // 若是枚举，创建枚举注释对象
    if (member instanceof EnumMember) {
      enumAnnotationConfig = enumAnnotationConfig || new EnumAnnotationConfig();
      return new EnumAnnotation(globalAnnotationConfig, enumAnnotationConfig, member);
    }
    // 若是接口，创建接口注释对象
    if (member instanceof InterfaceMember) {
      interfaceAnnotationConfig = interfaceAnnotationConfig || new InterfaceAnnotationConfig();
      return new InterfaceAnnotation(globalAnnotationConfig, interfaceAnnotationConfig, member);
    }

    // 若是自定义类型，创建自定义类型注释对象
    if (member instanceof TypedefMember) {
      typedefAnnotationConfig = typedefAnnotationConfig || new TypedefAnnotationConfig();
      return new TypedefAnnotation(globalAnnotationConfig, typedefAnnotationConfig, member);
    }
  }
  public static getAnnotations(members: Array<IMember | null>, config: Config) {
    return members.map(member => this.getAnnotation(member, config));
  }
}
