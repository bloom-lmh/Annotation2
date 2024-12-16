import { BaseAnnotation } from "./baseAnnotation";

/**
 * 抽象类注解模型
 * @description 
 * @abstract
 * @access
 * @alias
 * @argument
 * @async
 * @augments
 * @borrows
 * @callback
 * @classdesc
 * @constant
 * @constructor
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @emits
 * @enum
 * @event
 * @external
 * @field
 * @file
 * @fileoverview
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @host
 * @ignore
 * @import
 * @inheritdoc
 * @inner
 * @instance
 * @kind
 * @lends
 * @license
 * @license
 * @link
 * @override
 * @package
 * @param
 * @private
 * @param
 * @private
 * @prop
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @satisfies
 * @linkcode
 * @linkplain
 * @listens
 * @member
 * @memberof
 * @method
 * @mixes
 * @module
 * @name
 * @namespace
 * @overload
 * @see
 * @since
 * @static
 * @summary
 * @template
 * @this
 * @throws
 * @template
 * @todo
 * @tutorial
 * @typedef
 * @var
 * @variation
 * @version
 * @virtual
 * @yields
 */
export class ClassAnnotation extends BaseAnnotation {
    /**
     * 是否标记为类
     * @description 用于标记该 JSDoc 注释适用于一个类
     * @type {boolean | null}
     */
    protected _class: boolean | null = null;

    /**
   * 是否标记为构造函数
   * @description 标记构造函数。通常在类的构造函数上使用，但在大多数情况下，可以省略，因为构造函数默认是类的一部分
   * @type {boolean | null}
   */
    protected _constructor: boolean | null = null;

    /**
     * 继承的父类
     * @description 描述类继承自哪个父类。通常用于标注类继承关系
     * @type {string | null}
     */
    protected _extends: string | null = null;

    /**
   * 实现的接口
   * @description 描述类实现了哪些接口
   * @type {string | null}
   */
    protected _implements: string | null = '';
    /**
     * 是否为抽象类
     * @type {boolean | null}
     */
    protected _abstract: boolean | null = null;

    /**
     * 是否为抽象类
     * @type {boolean | null}
     */
    protected _module: boolean | null = null
    /**
     * 构造函数参数
     * @type {Array<[string, string]> | Map<string, string> | null}
     */
    protected _params: Array<[string, string]> | Map<string, string> | null = null;

    /**
     * 实现描述
     * @type {string | null}
     */
    protected _implement: string | null = null;

    /**
     * 返回值类型
     * @type {string | null}
     */
    protected _returns: string | null = null;

    /**
     * 设置类标记
     * @param {boolean} classFlag - 是否标记为类
     * @returns {ClassAnnotation} 当前实例
     */
    setClass(classFlag: boolean): this {
        this._class = classFlag;
        return this;
    }

    /**
     * 设置抽象类标记
     * @param {boolean} abstractFlag - 是否为抽象类
     * @returns {ClassAnnotation} 当前实例
     */
    setAbstract(abstractFlag: boolean): this {
        this._abstract = abstractFlag;
        return this;
    }

    /**
     * 设置构造函数标记
     * @param {boolean} isConstructorFlag - 是否标记为构造函数
     * @returns {ClassAnnotation} 当前实例
     */
    setIsConstructor(constructorFlag: boolean): this {
        this._constructor = constructorFlag;
        return this;
    }

    /**
     * 设置接口标记
     * @param {boolean} interfaceFlag - 是否为接口
     * @returns {ClassAnnotation} 当前实例
     */
    /*   setInterface(interfaceFlag: boolean): this {
          this._interface = interfaceFlag;
          return this;
      } */

    /**
     * 设置继承的父类
     * @param {string} extendsClass - 继承的父类
     * @returns {ClassAnnotation} 当前实例
     */
    setExtends(extendsClass: string): this {
        this._extends = extendsClass;
        return this;
    }

    /**
     * 设置实现的接口
     * @param {string} implementsInterfaces - 实现的接口
     * @returns {ClassAnnotation} 当前实例
     */
    setImplements(implementsInterfaces: string): this {
        this._implements = implementsInterfaces;
        return this;
    }

    /**
     * 设置构造函数的参数
     * @param {Array<[string, string]> | Map<string, string>} params - 构造函数参数
     * @returns {ClassAnnotation} 当前实例
     */
    setParams(params: Array<[string, string]> | Map<string, string>): this {
        this._params = params;
        return this;
    }

    /**
     * 设置实现描述
     * @param {string} implementDescription - 实现描述
     * @returns {ClassAnnotation} 当前实例
     */
    setImplement(implementDescription: string): this {
        this._implement = implementDescription;
        return this;
    }

    /**
     * 设置返回值类型
     * @param {string} returnsType - 返回值类型
     * @returns {ClassAnnotation} 当前实例
     */
    setReturns(returnsType: string): this {
        this._returns = returnsType;
        return this;
    }
}
