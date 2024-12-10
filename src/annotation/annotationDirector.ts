import { ClassAnnotation, MethodAnnotation } from "./annotation";
import { ClassAnnotationBuilder, MethodAnnotationBuilder } from "./annotationBuilder";

/**
 * 类注解指挥者
 */
export class ClassAnnotationDirector {

    /**
     * 创建默认类注解
     */
    public static buildDefaultClassAnnotation(classAnnotationBuilder: ClassAnnotationBuilder): ClassAnnotation {
        classAnnotationBuilder.setDescription("描述该类的一些信息").setClass(true).setName("类名");
        return classAnnotationBuilder.getAnnotation()
    }
}


/**
 * 方法注解指挥者
 */
/* export class MethodAnnotationDirector {

 
    public static buildDefaultMethodAnnotation(methodAnnotationBuilder: MethodAnnotationBuilder): MethodAnnotation {

    }
} */
