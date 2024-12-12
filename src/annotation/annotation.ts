/**
 * 抽象注解类
 * @description 定义所有注解模型具有的公共标签
 */


export abstract class BaseAnnotation {
    protected _name: string | null = null;      // 类名
    protected _author: string | null = null;     // 作者信息
    protected _deprecated: boolean | null = null; // 是否已过时
    protected _memberof: string | null = null; // 所属的类或模块
    protected _example: string | null = null; // 示例代码
    protected _since: string | null = null; // 标记某个功能或方法自哪个版本开始存在
    protected _version: string | null = null; // 当前的版本
    protected _see: string | null = null; // 相关参考
    protected _description: string | null = null; // 描述或注释
    protected _private: boolean | null = null; // 是否为私有
    protected _protected: boolean | null = null; // 是否为受保护
    protected _public: boolean | null = null; // 是否为公共
    protected _readonly: boolean | null = null; // 是否为只读

    // Getter 和 Setter 方法

    get name(): string | null {
        return this._name
    }
    set name(value: string) {
        this._name = value;
    }
    get author(): string | null {
        return this._author
    }
    set author(value: string) {
        this._author = value
    }
    get deprecated(): boolean | null {
        return this._deprecated;
    }

    set deprecated(value: boolean) {
        this._deprecated = value;
    }

    get memberof(): string | null {
        return this._memberof;
    }

    set memberof(value: string) {
        this._memberof = value;
    }

    get example(): string | null {
        return this._example;
    }

    set example(value: string) {
        this._example = value;
    }

    get since(): string | null {
        return this._since;
    }

    set since(value: string) {
        this._since = value;
    }

    get version(): string | null {
        return this._version;
    }

    set version(value: string) {
        this._version = value;
    }

    get see(): string | null {
        return this._see;
    }

    set see(value: string) {
        this._see = value;
    }

    get description(): string | null {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get private(): boolean | null {
        return this._private;
    }

    set private(value: boolean) {
        this._private = value;
    }

    get protected(): boolean | null {
        return this._protected;
    }

    set protected(value: boolean) {
        this._protected = value;
    }

    get public(): boolean | null {
        return this._public;
    }

    set public(value: boolean) {
        this._public = value;
    }

    get readonly(): boolean | null {
        return this._readonly;
    }

    set readonly(value: boolean) {
        this._readonly = value;
    }
}

/**
 * 抽象类注解类
 * @description 定义类注解模型具有的基本标签
 */
export class ClassAnnotation extends BaseAnnotation {
    protected _class: boolean | null = null; // 是否标记为类
    protected _abstract: boolean | null = null; // 是否为抽象类
    protected _isConstructor: boolean | null = null; // 是否标记为构造函数
    protected _interface: boolean | null = null; // 是否为接口
    protected _extends: string | null = null; // 继承的父类
    protected _implements: string | null = ''; // 实现的接口
    protected _params: Array<[string, string]> | Map<string, string> | null = null; // 构造函数参数
    protected _implement: string | null = null; // 实现描述
    protected _returns: string | null = null; // 返回值类型
    // Getter 和 Setter 方法

    // 1. _class
    get class(): boolean | null {
        return this._class;
    }

    set class(value: boolean) {
        this._class = value;
    }

    // 2. _abstract
    get abstract(): boolean | null {
        return this._abstract;
    }

    set abstract(value: boolean) {
        this._abstract = value;
    }

    // 3. _constructor
    get isConstructor(): boolean | null {
        return this._isConstructor;
    }

    set isConstructor(value: boolean) {
        this._isConstructor = value;
    }

    // 4. _interface
    get interface(): boolean | null {
        return this._interface;
    }

    set interface(value: boolean) {
        this._interface = value;
    }

    // 5. _extends
    get extends(): string | null {
        return this._extends;
    }

    set extends(value: string) {
        this._extends = value;
    }

    // 6. _implements
    get implements(): string | null {
        return this._implements;
    }

    set implements(value: string) {
        this._implements = value;
    }

    // 7. _params
    get params(): Array<[string, string]> | Map<string, string> | null {
        return this._params;
    }

    set params(value: Array<[string, string]> | Map<string, string>) {
        this._params = value;
    }

    // 8. _implement
    get implement(): string | null {
        return this._implement;
    }

    set implement(value: string) {
        this._implement = value;
    }

    // 9. _returns
    get returns(): string | null {
        return this._returns;
    }

    set returns(value: string) {
        this._returns = value;
    }
}

/**
 * 抽象方法注解类
 * @description 定义方法注解模型具有的基本标签
 */
export class MethodAnnotation extends BaseAnnotation {
    protected _method: boolean | null = null; // 是否标记为方法
    protected _abstract: boolean | null = null; // 是否为抽象方法
    protected _async: boolean | null = null; // 是否为异步方法
    protected _params: Array<[string, string]> | Map<string, string> | null = null; // 参数列表，格式：[参数名, 类型]
    protected _returns: string | null = null; // 返回值类型
    protected _throws: string | null = null; // 抛出的异常描述
    protected _override: boolean | null = null; // 是否覆盖父类方法
    // Getter 和 Setter 方法

    // 1. _method
    get method(): boolean | null {
        return this._method;
    }

    set method(value: boolean) {
        this._method = value;
    }

    // 2. _abstract
    get abstract(): boolean | null {
        return this._abstract;
    }

    set abstract(value: boolean) {
        this._abstract = value;
    }

    // 3. _async
    get async(): boolean | null {
        return this._async;
    }

    set async(value: boolean) {
        this._async = value;
    }

    // 4. _params
    get params(): Array<[string, string]> | Map<string, string> | null {
        return this._params;
    }

    set params(value: Array<[string, string]> | Map<string, string>) {
        this._params = value;
    }

    // 5. _returns
    get returns(): string | null {
        return this._returns;
    }

    set returns(value: string) {
        this._returns = value;
    }

    // 6. _throws
    get throws(): string | null {
        return this._throws;
    }

    set throws(value: string) {
        this._throws = value;
    }

    // 7. _override
    get override(): boolean | null {
        return this._override;
    }

    set override(value: boolean) {
        this._override = value;
    }
}

/**
 * 抽象属性注解类
 * @description 定义属性注解模型具有的基本标签
 */
export class PropertyAnnotation extends BaseAnnotation {
    protected _property: boolean | null = null; // 是否标记为属性
    protected _static: boolean | null = null; // 是否为静态属性
    protected _type: string | null = null; // 属性的类型
    protected _defaultValue: string | number | boolean | null = null; // 属性的默认值
    // Getter 和 Setter 方法

    // 1. _property
    get property(): boolean | null {
        return this._property;
    }

    set property(value: boolean) {
        this._property = value;
    }

    // 2. _static
    get static(): boolean | null {
        return this._static;
    }

    set static(value: boolean) {
        this._static = value;
    }

    // 3. _type
    get type(): string | null {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    // 4. _defaultValue
    get defaultValue(): string | number | boolean | null {
        return this._defaultValue;
    }

    set defaultValue(value: string | number | boolean | null) {
        this._defaultValue = value;
    }
}



