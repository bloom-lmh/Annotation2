import { ClassAnnotationConfig, Config, MethodAnnotationConfig, PropertyAnnotationConfig } from "../config/config";
import { MemberDeclaration } from "../utils/astUtil";
import { BaseAnnotation, ClassAnnotation, MethodAnnotation, PropertyAnnotation } from "./annotation";
import { BaseAnnotationBuilder, ClassAnnotationBuilder, MethodAnnotationBuilder, PropertyAnnotationBuilder } from "./annotationBuilder";

abstract class AnnotationDirector<T extends BaseAnnotation, E> {
    public abstract constructDefaultAnnotation(builder: BaseAnnotationBuilder<T>): T;
    public abstract constructAnnotationByContext(builder: BaseAnnotationBuilder<T>, memberDeclaration: MemberDeclaration, config: E): T
}

/**
 * 类注解指挥者
 */
export class ClassAnnotationDirector extends AnnotationDirector<ClassAnnotation, ClassAnnotationConfig> {


    /**
     * 创建默认类注解
     */
    public constructDefaultAnnotation(builder: ClassAnnotationBuilder): ClassAnnotation {
        return builder
            .setDescription("描述该类的一些信息")
            .setClass(true)
            .setName("类名")
            .build();
    }
    /**
     * 
     * @param builder 建造者
     * @param memberDeclaration 成员信息
     * @param config  配置信息
     */
    public constructAnnotationByContext(builder: ClassAnnotationBuilder, memberDeclaration: MemberDeclaration, config: ClassAnnotationConfig): ClassAnnotation {
        return builder
            .setDescription("描述该类的一些信息")
            .setClass(true)
            .setName("类名")
            .build();
    }
}


/**
 * 方法注解指挥者
 */
export class MethodAnnotationDirector extends AnnotationDirector<MethodAnnotation, MethodAnnotationConfig> {

    /**
     * 创建默认方法注解
     */
    public constructDefaultAnnotation(builder: MethodAnnotationBuilder): MethodAnnotation {
        return builder
            .setDescription("描述该类的一些信息")
            .setMethod(true)
            .setName("方法名")
            .build();
    }
    /**
     * 
     * @param builder 建造者
     * @param memberDeclaration 成员信息
     * @param config  配置信息
     */
    public constructAnnotationByContext(builder: MethodAnnotationBuilder, memberDeclaration: MemberDeclaration, config: MethodAnnotationConfig): MethodAnnotation {
        return builder
            .setDescription("描述该类的一些信息")
            .setMethod(true)
            .setName("方法名")
            .build();
    }
}



/**
 * 属性注解指挥者
 */
export class PropertyAnnotationDirector extends AnnotationDirector<PropertyAnnotation, PropertyAnnotationConfig> {


    /**
     * 创建默认属性注解
     */
    public constructDefaultAnnotation(builder: PropertyAnnotationBuilder): PropertyAnnotation {
        return builder
            .setDescription("描述该类的一些信息")
            .setType("属性类型")
            .setDefaultValue("默认值")
            .build();
    }
    /**
     * 
     * @param builder 建造者
     * @param memberDeclaration 成员信息
     * @param config  配置信息
     */
    public constructAnnotationByContext(builder: PropertyAnnotationBuilder, memberDeclaration: MemberDeclaration, config: PropertyAnnotationConfig): PropertyAnnotation {
        return builder
            .setDescription("描述该类的一些信息")
            .setType("属性类型")
            .setDefaultValue("默认值")
            .build();
    }

}
