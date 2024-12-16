import { BaseAnnotation } from "./baseAnnotation";

/**
 * 方法注解模型
 * @description 定义方法注解模型的基本标签
 */
export class MethodAnnotation extends BaseAnnotation {
    /**
     * 是否标记为方法
     * @type {boolean | null}
     */
    protected _method: boolean | null = null;

    /**
     * 是否为抽象方法
     * @type {boolean | null}
     */
    protected _abstract: boolean | null = null;

    /**
     * 是否为异步方法
     * @type {boolean | null}
     */
    protected _async: boolean | null = null;

    /**
     * 参数列表，格式：[参数名, 类型]
     * @type {Array<[string, string]> | Map<string, string> | null}
     */
    protected _params: Array<[string, string]> | Map<string, string> | null = null;

    /**
     * 返回值类型
     * @type {string | null}
     */
    protected _returns: string | null = null;

    /**
     * 抛出的异常描述
     * @type {string | null}
     */
    protected _throws: string | null = null;

    /**
     * 是否覆盖父类方法
     * @type {boolean | null}
     */
    protected _override: boolean | null = null;

    /**
     * 设置方法标记
     * @param {boolean} methodFlag - 是否标记为方法
     * @returns {MethodAnnotation} 当前实例
     */
    setMethod(methodFlag: boolean): this {
        this._method = methodFlag;
        return this;
    }

    /**
     * 设置抽象方法标记
     * @param {boolean} abstractFlag - 是否为抽象方法
     * @returns {MethodAnnotation} 当前实例
     */
    setAbstract(abstractFlag: boolean): this {
        this._abstract = abstractFlag;
        return this;
    }

    /**
     * 设置异步方法标记
     * @param {boolean} asyncFlag - 是否为异步方法
     * @returns {MethodAnnotation} 当前实例
     */
    setAsync(asyncFlag: boolean): this {
        this._async = asyncFlag;
        return this;
    }

    /**
     * 设置方法参数
     * @param {Array<[string, string]> | Map<string, string>} params - 参数列表，格式：[参数名, 类型]
     * @returns {MethodAnnotation} 当前实例
     */
    setParams(params: Array<[string, string]> | Map<string, string>): this {
        this._params = params;
        return this;
    }

    /**
     * 设置返回值类型
     * @param {string} returnType - 返回值类型
     * @returns {MethodAnnotation} 当前实例
     */
    setReturns(returnType: string): this {
        this._returns = returnType;
        return this;
    }

    /**
     * 设置抛出的异常描述
     * @param {string} throwsDescription - 抛出的异常描述
     * @returns {MethodAnnotation} 当前实例
     */
    setThrows(throwsDescription: string): this {
        this._throws = throwsDescription;
        return this;
    }

    /**
     * 设置是否覆盖父类方法
     * @param {boolean} overrideFlag - 是否覆盖父类方法
     * @returns {MethodAnnotation} 当前实例
     */
    setOverride(overrideFlag: boolean): this {
        this._override = overrideFlag;
        return this;
    }
}
