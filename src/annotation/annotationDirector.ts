import { BaseAnnotation, ClassAnnotation, MethodAnnotation, PropertyAnnotation } from "./annotation";
import { BaseAnnotationBuilder, ClassAnnotationBuilder, MethodAnnotationBuilder, PropertyAnnotationBuilder } from "./annotationBuilder";

abstract class AnnotationDirector {
    public static constructDefaultAnnotation<T extends BaseAnnotation>(builder: BaseAnnotationBuilder<T>): T {
        throw new Error("Method must be implemented.");
    }
}
/**
 * 类注解指挥者
 */
export class ClassAnnotationDirector extends AnnotationDirector {

    /**
     * 创建默认类注解
     */
    public static constructDefaultClassAnnotation(classAnnotationBuilder: ClassAnnotationBuilder): ClassAnnotation {
        return classAnnotationBuilder
            .setDescription("描述该类的一些信息")
            .setClass(true)
            .setName("类名")
            .build();
    }
}


/**
 * 方法注解指挥者
 */
export class MethodAnnotationDirector extends AnnotationDirector {
    /**
     * 创建默认方法注解
     */
    public static constructDefaultMethodAnnotation(methodAnnotationBuilder: MethodAnnotationBuilder): MethodAnnotation {
        return methodAnnotationBuilder
            .setDescription("描述该类的一些信息")
            .setMethod(true)
            .setName("方法名")
            .build();
    }
}



/**
 * 属性注解指挥者
 */
export class PropertyAnnotationDirector extends AnnotationDirector {
    /**
     * 创建默认属性注解
     */
    public static constructDefaultPropertyAnnotation(propertyAnnotationBuilder: PropertyAnnotationBuilder): PropertyAnnotation {
        return propertyAnnotationBuilder
            .setDescription("描述该类的一些信息")
            .setType("属性类型")
            .setDefaultValue("默认值")
            .build();
    }
}
