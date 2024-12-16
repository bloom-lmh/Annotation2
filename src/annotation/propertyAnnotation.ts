import { BaseAnnotation } from "./baseAnnotation";

/**
 * 属性注解类
 * @description 定义属性注解模型具有的基本标签
 */
export class PropertyAnnotation extends BaseAnnotation {
    protected _property: boolean | null = null;  // 是否标记为属性
    protected _static: boolean | null = null;    // 是否为静态属性
    protected _type: string | null = null;       // 属性的类型
    protected _defaultValue: string | number | boolean | null = null; // 属性的默认值

    /**
     * 设置是否标记为属性
     * @param {boolean} propertyFlag - 是否标记为属性
     * @returns {PropertyAnnotation} 当前实例
     */
    setProperty(propertyFlag: boolean): PropertyAnnotation {
        this._property = propertyFlag;
        return this;
    }

    /**
     * 设置是否为静态属性
     * @param {boolean} staticFlag - 是否为静态属性
     * @returns {PropertyAnnotation} 当前实例
     */
    setStatic(staticFlag: boolean): PropertyAnnotation {
        this._static = staticFlag;
        return this;
    }

    /**
     * 设置属性的类型
     * @param {string} type - 属性的类型
     * @returns {PropertyAnnotation} 当前实例
     */
    setType(type: string): PropertyAnnotation {
        this._type = type;
        return this;
    }

    /**
     * 设置属性的默认值
     * @param {string | number | boolean | null} defaultValue - 属性的默认值
     * @returns {PropertyAnnotation} 当前实例
     */
    setDefaultValue(defaultValue: string | number | boolean | null): PropertyAnnotation {
        this._defaultValue = defaultValue;
        return this;
    }
}
