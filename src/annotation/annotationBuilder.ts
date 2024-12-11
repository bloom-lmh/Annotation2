import { ClassAnnotation, MethodAnnotation, PropertyAnnotation } from "./annotation";

/**
 * 通用注解建造者
 */
class BaseAnnotationBuilder<T> {
    protected annotation: T;

    constructor(annotation: T) {
        this.annotation = annotation;
    }

    public setName(name: string): this {
        // 假设所有注解对象都有 name 属性
        (this.annotation as any).name = name;
        return this;
    }

    public setDeprecated(isDeprecated: boolean): this {
        // 假设所有注解对象都有 deprecated 属性
        (this.annotation as any).deprecated = isDeprecated;
        return this;
    }

    public setMemberof(memberof: string): this {
        // 假设所有注解对象都有 memberof 属性
        (this.annotation as any).memberof = memberof;
        return this;
    }

    public setExample(example: string): this {
        // 假设所有注解对象都有 example 属性
        (this.annotation as any).example = example;
        return this;
    }

    public setSince(since: string): this {
        // 假设所有注解对象都有 since 属性
        (this.annotation as any).since = since;
        return this;
    }

    public setVersion(version: string): this {
        // 假设所有注解对象都有 version 属性
        (this.annotation as any).version = version;
        return this;
    }

    public setSee(see: string): this {
        // 假设所有注解对象都有 see 属性
        (this.annotation as any).see = see;
        return this;
    }

    public setDescription(description: string): this {
        // 假设所有注解对象都有 description 属性
        (this.annotation as any).description = description;
        return this;
    }

    // 其他共同的 set 方法（如私有、公共、只读等）
    public setPrivate(isPrivate: boolean): this {
        (this.annotation as any).private = isPrivate;
        return this;
    }

    public setProtected(isProtected: boolean): this {
        (this.annotation as any).protected = isProtected;
        return this;
    }

    public setPublic(isPublic: boolean): this {
        (this.annotation as any).public = isPublic;
        return this;
    }

    public setReadonly(isReadonly: boolean): this {
        (this.annotation as any).readonly = isReadonly;
        return this;
    }

    // 返回注解对象
    public build(): T {
        return this.annotation;
    }
}
/**
 * 类注解建造者
 * @description 产品类为类注解对象
 * @see 如果系统只需要一个建造者的话可以省略掉抽象的建造者
 */
export class ClassAnnotationBuilder extends BaseAnnotationBuilder<ClassAnnotation> {


    constructor() {
        super(new ClassAnnotation())
    }


    // 是否标记为类
    public setClass(isClass: boolean): this {
        this.annotation.class = isClass;
        return this;
    }

    // 是否为抽象类
    public setAbstract(isAbstract: boolean): this {
        this.annotation.abstract = isAbstract;
        return this;
    }

    // 是否标记为构造函数
    public setIsConstructor(isConstructor: boolean): this {
        this.annotation.isConstructor = isConstructor;
        return this;
    }

    // 是否为接口
    public setInterface(isInterface: boolean): this {
        this.annotation.interface = isInterface;
        return this;
    }

    // 继承的父类
    public setExtends(extendsClass: string): this {
        this.annotation.extends = extendsClass;
        return this;
    }

    // 实现的接口
    public setImplements(implementsInterface: string): this {
        this.annotation.implements = implementsInterface;
        return this;
    }

    // 构造函数参数
    public setParams(params: Array<[string, string]> | Map<string, string>): this {
        this.annotation.params = params;
        return this;
    }

    // 实现描述
    public setImplement(implement: string): this {
        this.annotation.implement = implement;
        return this;
    }

    // 返回值类型
    public setReturns(returns: string): this {
        this.annotation.returns = returns;
        return this;
    }
}
/**
 * 方法注解建造者
 * @description 产品类为方法注解对象
 */
export class MethodAnnotationBuilder extends BaseAnnotationBuilder<MethodAnnotation> {

    /**
     * 构造器
     * @param methodAnnotation 方法注解对象产品
     */
    constructor() {
        super(new MethodAnnotation())
    }
    // 是否标记为方法
    public setMethod(isMethod: boolean): this {
        this.annotation.method = isMethod;
        return this;
    }

    // 是否为抽象方法
    public setAbstract(isAbstract: boolean): this {
        this.annotation.abstract = isAbstract;
        return this;
    }

    // 是否为异步方法
    public setAsync(isAsync: boolean): this {
        this.annotation.async = isAsync;
        return this;
    }

    // 参数列表，格式：[参数名, 类型]
    public setParams(params: Array<[string, string]> | Map<string, string>): this {
        this.annotation.params = params;
        return this;
    }

    // 返回值类型
    public setReturns(returns: string): this {
        this.annotation.returns = returns;
        return this;
    }

    // 抛出的异常描述
    public setThrows(throws: string): this {
        this.annotation.throws = throws;
        return this;
    }

    // 是否覆盖父类方法
    public setOverride(isOverride: boolean): this {
        this.annotation.override = isOverride;
        return this;
    }
}

/**
 * 属性注解建造者
 * @description 产品类为属性注解对象
 */
export class PropertyAnnotationBuilder extends BaseAnnotationBuilder<PropertyAnnotation> {
    /**
     * 构造器
     * @param propertyAnnotation 属性注解对象产品
     */
    constructor() {
        super(new PropertyAnnotation())
    }
    // 是否标记为属性
    public setProperty(isProperty: boolean): this {
        this.annotation.property = isProperty;
        return this;
    }

    // 是否为静态属性
    public setStatic(isStatic: boolean): this {
        this.annotation.static = isStatic;
        return this;
    }

    // 属性的类型
    public setType(type: string): this {
        this.annotation.type = type;
        return this;
    }

    // 属性的默认值
    public setDefaultValue(defaultValue: string | number | boolean | null): this {
        this.annotation.defaultValue = defaultValue;
        return this;
    }

}