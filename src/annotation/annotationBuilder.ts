import { AccessType, MethodType } from '../member/memberType';

/**
 * annotation生成器
 */
export class AnnotationBuilder {
  private annotation: string = '';

  constructor() {
    this.annotation = '/**';
  }

  setAuthorTag(value: string): this {
    value && (this.annotation += `\n * @author ${value}`);
    return this;
  }
  setAccessTag(value: AccessType): this {
    switch (value) {
      case 0:
        this.annotation += `\n * @access public`;
        break;
      case 1:
        this.annotation += `\n * @access private`;
        break;
      case 2:
        this.annotation += `\n * @access protected`;
        break;
    }
    return this;
  }
  setAliasTag(value: boolean): this {
    value && (this.annotation += `\n * @alias`);
    return this;
  }
  setVersionTag(value: string): this {
    value && (this.annotation += `\n * @version ${value} `);
    return this;
  }
  setNameTag(value: string): this {
    value && (this.annotation += `\n * @name ${value} `);
    return this;
  }
  setDescriptionTag(value: boolean): this {
    value && (this.annotation += `\n * @description`);
    return this;
  }
  setLicenseTag(value: string): this {
    value && (this.annotation += `\n * @license ${value} `);
    return this;
  }
  setCopyrightTag(value: string): this {
    value && (this.annotation += `\n * @copyright ${value} `);
    return this;
  }
  setSeeTag(value: boolean): this {
    value && (this.annotation += `\n * @see`);
    return this;
  }
  setSummaryTag(value: boolean): this {
    value && (this.annotation += `\n * @summary`);
    return this;
  }
  setExampleTag(value: boolean): this {
    value && (this.annotation += `\n * @example`);
    return this;
  }
  setInterfaceTag(value: boolean): this {
    value && (this.annotation += `\n * @interface`);
    return this;
  }
  setFileTag(value: boolean): this {
    value && (this.annotation += `\n * @file`);
    return this;
  }
  setModuleTag(value: boolean): this {
    value && (this.annotation += `\n * @module`);
    return this;
  }
  setEnumTag(value: boolean): this {
    value && (this.annotation += `\n * @enum`);
    return this;
  }
  setTypedefTag(typedefTag: string): this {
    typedefTag && (this.annotation += `\n * @typedef ${typedefTag} `);
    return this;
  }
  setTypeTag(value: string): this {
    value && (this.annotation += `\n * @type {${value} } `);
    return this;
  }
  setClassTag(value: boolean): this {
    value && (this.annotation += `\n * @class`);
    return this;
  }
  setAbstract(value: boolean): this {
    value && (this.annotation += `\n * @abstract`);
    return this;
  }
  setExtendsTag(value: string | Array<string>): this {
    if (value) {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(item => {
          this.annotation += `\n * @extends ${item} `;
        });
      } else {
        this.annotation += `\n * @extends ${value} `;
      }
    }
    return this;
  }
  setImplementsTag(value: Array<string>): this {
    if (value && value.length > 0) {
      value.forEach(v => {
        this.annotation += `\n * @implements {${v} } `;
      });
    }
    return this;
  }
  setAsyncTag(value: boolean): this {
    value && (this.annotation += `\n * @async`);
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
    this.annotation += `\n * @method`;
    return this;
  }
  private _setFunctionTag(): this {
    this.annotation += `\n * @function`;
    return this;
  }
  private _setConstructorTag(): this {
    this.annotation += `\n * @constructor`;
    return this;
  }
  setThrowsTag(value: Set<string>): this {
    if (value && value.size > 0) {
      value.forEach(v => {
        this.annotation += `\n * @throws {${v} } `;
      });
    }
    return this;
  }
  setParamsTag(value: string[][]): this {
    if (value && value.length > 0) {
      value.forEach(v => {
        this.annotation += `\n * @param {${v[1]} } ${v[0]} `;
      });
    }
    return this;
  }
  setReturnsTag(value: string): this {
    value && (this.annotation += `\n * @returns {${value} } `);
    return this;
  }
  setStaticTag(value: boolean): this {
    value && (this.annotation += `\n * @static`);
    return this;
  }
  setPropertyTag(value: boolean): this {
    value && (this.annotation += `\n * @property {${value} } `);
    return this;
  }
  setDefaultTag(value: string): this {
    value && (this.annotation += `\n * @default ${value} `);
    return this;
  }

  union(other: string): this {
    other = other.startsWith('/**') ? other.slice(3) : other;
    other = other.endsWith('\n */') ? other.slice(0, -4) : other;
    this.annotation += other;
    return this;
  }
  public build(): string {
    this.annotation += '\n */';
    return this.annotation;
  }
}
