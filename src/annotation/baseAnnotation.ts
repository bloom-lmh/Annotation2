/**
 * 基础注解模型
 * @description 定义所有注解模型具有的公共标签
 */
export abstract class BaseAnnotation {
    /**
     * 成员名
     * @type {string | null}
     */
    protected _name: string | null = null;

    /**
     * 作者信息
     * @type {string | null}
     */
    protected _author: string | null = null;

    /**
     * 是否已过时
     * @type {boolean | null}
     */
    protected _deprecated: boolean | null = null;

    /**
     * 所属的类或模块
     * @type {string | null}
     */
    protected _memberof: string | null = null;

    /**
     * 示例代码
     * @type {string | null}
     */
    protected _example: string | null = null;

    /**
     * 标记某个功能或方法自哪个版本开始存在
     * @type {string | null}
     */
    protected _since: string | null = null;

    /**
     * 当前的版本
     * @type {string | null}
     */
    protected _version: string | null = null;

    /**
     * 相关参考
     * @type {string | null}
     */
    protected _see: string | null = null;

    /**
     * 描述或注释
     * @type {string | null}
     */
    protected _description: string | null = null;

    /**
     * 是否为私有
     * @type {boolean | null}
     */
    protected _private: boolean | null = null;

    /**
     * 是否为受保护
     * @type {boolean | null}
     */
    protected _protected: boolean | null = null;

    /**
     * 是否为公共
     * @type {boolean | null}
     */
    protected _public: boolean | null = null;

    /**
     * 是否为只读
     * @type {boolean | null}
     */
    protected _readonly: boolean | null = null;

    /**
     * 泛型类型
     * @type {Array<string> | null}
     */
    protected _template: Array<string> | null = null

    // Setter 方法（链式调用）
    setName(name: string | null): this {
        this._name = name;
        return this;
    }

    setAuthor(author: string | null): this {
        this._author = author;
        return this;
    }

    setDeprecated(deprecated: boolean | null): this {
        this._deprecated = deprecated;
        return this;
    }

    setMemberof(memberof: string | null): this {
        this._memberof = memberof;
        return this;
    }

    setExample(example: string | null): this {
        this._example = example;
        return this;
    }

    setSince(since: string | null): this {
        this._since = since;
        return this;
    }

    setVersion(version: string | null): this {
        this._version = version;
        return this;
    }

    setSee(see: string | null): this {
        this._see = see;
        return this;
    }

    setDescription(description: string | null): this {
        this._description = description;
        return this;
    }

    setPrivate(privateFlag: boolean | null): this {
        this._private = privateFlag;
        return this;
    }

    setProtected(protectedFlag: boolean | null): this {
        this._protected = protectedFlag;
        return this;
    }

    setPublic(publicFlag: boolean | null): this {
        this._public = publicFlag;
        return this;
    }

    setReadonly(readonlyFlag: boolean | null): this {
        this._readonly = readonlyFlag;
        return this;
    }

    // 构建方法，返回当前实例
    build(): this {
        return this;
    }
}