import { AccessType, MethodType } from '../member/memberType';

/**
 * jsDoc生成器
 */
export class JSDocGenerator {
  private jsdoc: string = '';

  constructor() {
    this.jsdoc = '/**';
  }

  setAuthorTag(value: string): this {
    value && (this.jsdoc += `\n * @author ${value}`);
    return this;
  }
  setAccessTag(value: AccessType): this {
    switch (value) {
      case 0:
        this.jsdoc += `\n * @access public`;
        break;
      case 1:
        this.jsdoc += `\n * @access private`;
        break;
      case 2:
        this.jsdoc += `\n * @access protected`;
        break;
    }
    return this;
  }
  setAliasTag(value: boolean): this {
    value && (this.jsdoc += `\n * @alias`);
    return this;
  }
  setVersionTag(value: string): this {
    value && (this.jsdoc += `\n * @version ${value} `);
    return this;
  }
  setNameTag(value: string): this {
    value && (this.jsdoc += `\n * @name ${value} `);
    return this;
  }
  setDescriptionTag(value: boolean): this {
    value && (this.jsdoc += `\n * @description`);
    return this;
  }
  setLicenseTag(value: string): this {
    value && (this.jsdoc += `\n * @license ${value} `);
    return this;
  }
  setCopyrightTag(value: string): this {
    value && (this.jsdoc += `\n * @copyright ${value} `);
    return this;
  }
  setSeeTag(value: boolean): this {
    value && (this.jsdoc += `\n * @see`);
    return this;
  }
  setSummaryTag(value: boolean): this {
    value && (this.jsdoc += `\n * @summary`);
    return this;
  }
  setExampleTag(value: boolean): this {
    value && (this.jsdoc += `\n * @example`);
    return this;
  }
  setInterfaceTag(value: boolean): this {
    value && (this.jsdoc += `\n * @interface`);
    return this;
  }
  setFileTag(value: boolean): this {
    value && (this.jsdoc += `\n * @file`);
    return this;
  }
  setModuleTag(value: boolean): this {
    value && (this.jsdoc += `\n * @module`);
    return this;
  }
  setEnumTag(value: boolean): this {
    value && (this.jsdoc += `\n * @enum`);
    return this;
  }
  setTypedefTag(typedefTag: string): this {
    typedefTag && (this.jsdoc += `\n * @typedef ${typedefTag} `);
    return this;
  }
  setTypeTag(value: string): this {
    value && (this.jsdoc += `\n * @type {${value} } `);
    return this;
  }
  setClassTag(value: boolean): this {
    value && (this.jsdoc += `\n * @class`);
    return this;
  }
  setAbstract(value: boolean): this {
    value && (this.jsdoc += `\n * @abstract`);
    return this;
  }
  setExtendsTag(value: string | Array<string>): this {
    if (value) {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(item => {
          this.jsdoc += `\n * @extends ${item} `;
        });
      } else {
        this.jsdoc += `\n * @extends ${value} `;
      }
    }
    return this;
  }
  setImplementsTag(value: Array<string>): this {
    if (value && value.length > 0) {
      value.forEach(v => {
        this.jsdoc += `\n * @implements {${v} } `;
      });
    }
    return this;
  }
  setAsyncTag(value: boolean): this {
    value && (this.jsdoc += `\n * @async`);
    return this;
  }
  setMethodTag(value: MethodType): this {
    switch (value) {
      case 0:
        return this._setMethodTag();
      case 1:
        return this._setFunctionTag();
      case 2:
        return this._setConstructorTag();
      default:
        return this;
    }
  }
  private _setMethodTag(): this {
    this.jsdoc += `\n * @method`;
    return this;
  }
  private _setFunctionTag(): this {
    this.jsdoc += `\n * @function`;
    return this;
  }
  private _setConstructorTag(): this {
    this.jsdoc += `\n * @constructor`;
    return this;
  }
  setThrowsTag(value: Set<string>): this {
    if (value && value.size > 0) {
      value.forEach(v => {
        this.jsdoc += `\n * @throws {${v} } `;
      });
    }
    return this;
  }
  setParamsTag(value: string[][]): this {
    if (value && value.length > 0) {
      value.forEach(v => {
        this.jsdoc += `\n * @param {${v[1]} } ${v[0]} `;
      });
    }
    return this;
  }
  setReturnsTag(value: string): this {
    value && (this.jsdoc += `\n * @returns {${value} } `);
    return this;
  }
  setStaticTag(value: boolean): this {
    value && (this.jsdoc += `\n * @static`);
    return this;
  }
  setPropertyTag(value: boolean): this {
    value && (this.jsdoc += `\n * @property {${value} } `);
    return this;
  }
  setDefaultTag(value: string): this {
    value && (this.jsdoc += `\n * @default ${value} `);
    return this;
  }

  union(other: string): this {
    other = other.startsWith('/**') ? other.slice(3) : other;
    other = other.endsWith('\n */') ? other.slice(0, -4) : other;
    this.jsdoc += other;
    return this;
  }
  public build(): string {
    this.jsdoc += '\n */';
    return this.jsdoc;
  }
}
