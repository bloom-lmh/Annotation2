export abstract class MemberInfo { }
/**
 * 类模型
 */
export class ClassInfo extends MemberInfo {
    private _class: boolean | null = null; // 是否标记为类
    private _abstract: boolean | null = null; // 是否为抽象类
    private _isConstructor: boolean | null = null; // 是否标记为构造函数
    private _interface: boolean | null = null; // 是否为接口
    private _extends: string | null = null; // 继承的父类
    private _implements: string | null = ''; // 实现的接口
    private _params: Array<[string, string]> | Map<string, string> | null = null; // 构造函数参数
    private _returns: string | null = null; // 返回值类型

    get class(): boolean | null {
        return this._class;
    }

    set class(value: boolean) {
        this._class = value;
    }

    get abstract(): boolean | null {
        return this._abstract;
    }

    set abstract(value: boolean) {
        this._abstract = value;
    }

    get isConstructor(): boolean | null {
        return this._isConstructor;
    }

    set isConstructor(value: boolean) {
        this._isConstructor = value;
    }

    get interface(): boolean | null {
        return this._interface;
    }

    set interface(value: boolean) {
        this._interface = value;
    }

    get extends(): string | null {
        return this._extends;
    }

    set extends(value: string) {
        this._extends = value;
    }

    get implements(): string | null {
        return this._implements;
    }

    set implements(value: string) {
        this._implements = value;
    }

    get params(): Array<[string, string]> | Map<string, string> | null {
        return this._params;
    }

    set params(value: Array<[string, string]> | Map<string, string>) {
        this._params = value;
    }

    get returns(): string | null {
        return this._returns;
    }

    set returns(value: string) {
        this._returns = value;
    }
}
/**
 * 方法模型
 */
export class MethodInfo extends MemberInfo {
    private _method: boolean | null = null; // 是否标记为方法
    private _abstract: boolean | null = null; // 是否为抽象方法
    private _async: boolean | null = null; // 是否为异步方法
    private _params: Array<[string, string]> | Map<string, string> | null = null; // 参数列表，格式：[参数名, 类型]
    private _returns: string | null = null; // 返回值类型
    private _throws: string | null = null; // 抛出的异常描述
    private _override: boolean | null = null; // 是否覆盖父类方法
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
 * 属性模型
 */
export class PropertyInfo extends MemberInfo {
    private _property: boolean | null = null; // 是否标记为属性
    private _static: boolean | null = null; // 是否为静态属性
    private _type: string | null = null; // 属性的类型
    private _defaultValue: string | number | boolean | null = null; // 属性的默认值
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