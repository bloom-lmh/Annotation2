import { ClassAnnotation, MethodAnnotation, PropertyAnnotation } from "./annotation";

/**
 * 类注解建造者
 * @description 产品类为类注解对象
 * @see 如果系统只需要一个建造者的话可以省略掉抽象的建造者
 */
export class ClassAnnotationBuilder {
    /**
     * 产品类
     */
    private classAnnotation: ClassAnnotation

    /**
     * 构造器
     * @param classAnnotation 类注解对象产品
     */
    constructor(classAnnotation: ClassAnnotation) {
        this.classAnnotation = classAnnotation
    }
    public setName(name: string) {
        this.classAnnotation.name = name
        return this
    }
    // 是否已过时
    public setDeprecated(isDeprecated: boolean): this {
        this.classAnnotation.deprecated = isDeprecated;
        return this;
    }

    // 所属的类或模块
    public setMemberof(memberof: string): this {
        this.classAnnotation.memberof = memberof;
        return this;
    }

    // 示例代码
    public setExample(example: string): this {
        this.classAnnotation.example = example;
        return this;
    }

    // 引入的版本
    public setSince(since: string): this {
        this.classAnnotation.since = since;
        return this;
    }

    // 当前的版本
    public setVersion(version: string): this {
        this.classAnnotation.version = version;
        return this;
    }

    // 相关参考
    public setSee(see: string): this {
        this.classAnnotation.see = see;
        return this;
    }

    // 描述或注释
    public setDescription(description: string): this {
        this.classAnnotation.description = description;
        return this;
    }

    // 是否为私有
    public setPrivate(isPrivate: boolean): this {
        this.classAnnotation.private = isPrivate;
        return this;
    }

    // 是否为受保护
    public setProtected(isProtected: boolean): this {
        this.classAnnotation.protected = isProtected;
        return this;
    }

    // 是否为公共
    public setPublic(isPublic: boolean): this {
        this.classAnnotation.public = isPublic;
        return this;
    }

    // 是否为只读
    public setReadonly(isReadonly: boolean): this {
        this.classAnnotation.readonly = isReadonly;
        return this;
    }
    // 是否标记为类
    public setClass(isClass: boolean): this {
        this.classAnnotation.class = isClass;
        return this;
    }

    // 是否为抽象类
    public setAbstract(isAbstract: boolean): this {
        this.classAnnotation.abstract = isAbstract;
        return this;
    }

    // 是否标记为构造函数
    public setIsConstructor(isConstructor: boolean): this {
        this.classAnnotation.isConstructor = isConstructor;
        return this;
    }

    // 是否为接口
    public setInterface(isInterface: boolean): this {
        this.classAnnotation.interface = isInterface;
        return this;
    }

    // 继承的父类
    public setExtends(extendsClass: string): this {
        this.classAnnotation.extends = extendsClass;
        return this;
    }

    // 实现的接口
    public setImplements(implementsInterface: string): this {
        this.classAnnotation.implements = implementsInterface;
        return this;
    }

    // 构造函数参数
    public setParams(params: Array<[string, string]> | Map<string, string>): this {
        this.classAnnotation.params = params;
        return this;
    }

    // 实现描述
    public setImplement(implement: string): this {
        this.classAnnotation.implement = implement;
        return this;
    }

    // 返回值类型
    public setReturns(returns: string): this {
        this.classAnnotation.returns = returns;
        return this;
    }
    // 返回注解
    public getAnnotation(): ClassAnnotation {
        return this.classAnnotation
    }
}
/**
 * 方法注解建造者
 * @description 产品类为方法注解对象
 */
export class MethodAnnotationBuilder {
    /**
     * 产品类
     */
    private methodAnnotation: MethodAnnotation

    /**
     * 构造器
     * @param methodAnnotation 方法注解对象产品
     */
    constructor(methodAnnotation: MethodAnnotation) {
        this.methodAnnotation = methodAnnotation
    }
    public setName(name: string) {
        this.methodAnnotation.name = name
        return this
    }
    // 是否已过时
    public setDeprecated(isDeprecated: boolean): this {
        this.methodAnnotation.deprecated = isDeprecated;
        return this;
    }

    // 所属的类或模块
    public setMemberof(memberof: string): this {
        this.methodAnnotation.memberof = memberof;
        return this;
    }

    // 示例代码
    public setExample(example: string): this {
        this.methodAnnotation.example = example;
        return this;
    }

    // 引入的版本
    public setSince(since: string): this {
        this.methodAnnotation.since = since;
        return this;
    }

    // 当前的版本
    public setVersion(version: string): this {
        this.methodAnnotation.version = version;
        return this;
    }

    // 相关参考
    public setSee(see: string): this {
        this.methodAnnotation.see = see;
        return this;
    }

    // 描述或注释
    public setDescription(description: string): this {
        this.methodAnnotation.description = description;
        return this;
    }

    // 是否为私有
    public setPrivate(isPrivate: boolean): this {
        this.methodAnnotation.private = isPrivate;
        return this;
    }

    // 是否为受保护
    public setProtected(isProtected: boolean): this {
        this.methodAnnotation.protected = isProtected;
        return this;
    }

    // 是否为公共
    public setPublic(isPublic: boolean): this {
        this.methodAnnotation.public = isPublic;
        return this;
    }

    // 是否为只读
    public setReadonly(isReadonly: boolean): this {
        this.methodAnnotation.readonly = isReadonly;
        return this;
    }
    // 是否标记为方法
    public setMethod(isMethod: boolean): this {
        this.methodAnnotation.method = isMethod;
        return this;
    }

    // 是否为抽象方法
    public setAbstract(isAbstract: boolean): this {
        this.methodAnnotation.abstract = isAbstract;
        return this;
    }

    // 是否为异步方法
    public setAsync(isAsync: boolean): this {
        this.methodAnnotation.async = isAsync;
        return this;
    }

    // 参数列表，格式：[参数名, 类型]
    public setParams(params: Array<[string, string]> | Map<string, string>): this {
        this.methodAnnotation.params = params;
        return this;
    }

    // 返回值类型
    public setReturns(returns: string): this {
        this.methodAnnotation.returns = returns;
        return this;
    }

    // 抛出的异常描述
    public setThrows(throws: string): this {
        this.methodAnnotation.throws = throws;
        return this;
    }

    // 是否覆盖父类方法
    public setOverride(isOverride: boolean): this {
        this.methodAnnotation.override = isOverride;
        return this;
    }
    // 返回注解
    public getAnnotation(): this {
        return this
    }
}

/**
 * 属性注解建造者
 * @description 产品类为属性注解对象
 */
export class PropertyAnnotationBuilder {
    /**
     * 产品类
     */
    private propertyAnnotation: PropertyAnnotation

    /**
     * 构造器
     * @param propertyAnnotation 属性注解对象产品
     */
    constructor(propertyAnnotation: PropertyAnnotation) {
        this.propertyAnnotation = propertyAnnotation
    }
    public setName(name: string) {
        this.propertyAnnotation.name = name
        return this
    }
    public setDeprecated(isDeprecated: boolean): this {
        this.propertyAnnotation.deprecated = isDeprecated;
        return this;
    }

    // 所属的类或模块
    public setMemberof(memberof: string): this {
        this.propertyAnnotation.memberof = memberof;
        return this;
    }

    // 示例代码
    public setExample(example: string): this {
        this.propertyAnnotation.example = example;
        return this;
    }

    // 引入的版本
    public setSince(since: string): this {
        this.propertyAnnotation.since = since;
        return this;
    }

    // 当前的版本
    public setVersion(version: string): this {
        this.propertyAnnotation.version = version;
        return this;
    }

    // 相关参考
    public setSee(see: string): this {
        this.propertyAnnotation.see = see;
        return this;
    }

    // 描述或注释
    public setDescription(description: string): this {
        this.propertyAnnotation.description = description;
        return this;
    }

    // 是否为私有
    public setPrivate(isPrivate: boolean): this {
        this.propertyAnnotation.private = isPrivate;
        return this;
    }

    // 是否为受保护
    public setProtected(isProtected: boolean): this {
        this.propertyAnnotation.protected = isProtected;
        return this;
    }

    // 是否为公共
    public setPublic(isPublic: boolean): this {
        this.propertyAnnotation.public = isPublic;
        return this;
    }

    // 是否为只读
    public setReadonly(isReadonly: boolean): this {
        this.propertyAnnotation.readonly = isReadonly;
        return this;
    }
    // 是否标记为属性
    public setProperty(isProperty: boolean): this {
        this.propertyAnnotation.property = isProperty;
        return this;
    }

    // 是否为静态属性
    public setStatic(isStatic: boolean): this {
        this.propertyAnnotation.static = isStatic;
        return this;
    }

    // 属性的类型
    public setType(type: string): this {
        this.propertyAnnotation.type = type;
        return this;
    }

    // 属性的默认值
    public setDefaultValue(defaultValue: string | number | boolean | null): this {
        this.propertyAnnotation.defaultValue = defaultValue;
        return this;
    }
    // 返回注解
    public getAnnotation(): this {
        return this
    }
}