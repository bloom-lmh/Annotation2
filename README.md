# JSDoc Annotation

- [GitHub](https://github.com/bloom-lmh/Annotation2)
- [Gitee](https://gitee.com/bloom_lmh/annotation2)
- [English README](https://github.com/bloom-lmh/Annotation2/blob/master/README_EN.md)
- [Change Log](./CHANGELOG.md)

## 简介

JSDoc Annotation 是一个 VS Code 插件，用来为 TypeScript 和 JavaScript 声明生成 JSDoc / TSDoc 风格的注释块。

当前版本已经切到 AST-only 主路径，重点不再是“尽量快地正则匹配”，而是：

- 覆盖更全
- 输出更稳定
- 配置更清晰
- 更容易维护和扩展

## 当前支持的声明类型

- 类
- 构造器
- 普通函数
- 类方法
- 接口方法签名
- 属性
- 接口属性签名
- 枚举
- 接口
- 类型别名
- 泛型声明
- 可从 AST 推断出的 `async` 和 `throws`

## 命令与快捷键

| 命令 | 快捷键 | 说明 |
| --- | --- | --- |
| `addAnnotation` | `Alt+\` | 为光标所在声明生成注释 |
| `addAnnotations` | `Ctrl+Alt+\` | 为当前文件内所有支持的声明批量生成注释 |
| `openConfigConsole` | `Alt+Shift+\` | 打开插件设置 |

## 配置方式

当前最重要的行为配置是 `annotation.behavior.mode`：

- `insert`
  始终插入新的注释块
- `replace`
  如果声明上方已有 JSDoc，则替换
- `skip`
  如果声明上方已有 JSDoc，则跳过

你可以在 VS Code 设置里配置，也可以在项目中放以下任一文件：

- `annotation.config.json`
- `.annotationrc.json`
- `.vscode/annotation.json`

示例：

```json
{
  "behavior": {
    "mode": "replace"
  },
  "global": {
    "authorInfo": "your-name",
    "versionInfo": "1.0.0"
  },
  "method": {
    "tags": {
      "paramsTag": true,
      "returnsTag": true,
      "throwsTag": true,
      "templateTag": true,
      "descriptionTag": false
    }
  }
}
```

## 默认标签开关

下面是当前默认开启的主要标签，和 `package.json` 中的扩展配置保持一致：

- `class.tags`
  `classTag` `abstractTag` `extendsTag` `implementsTag` `nameTag` `descriptionTag` `templateTag`
- `method.tags`
  `asyncTag` `functionTag` `constructorTag` `throwsTag` `paramsTag` `returnsTag` `staticTag` `accessTag` `nameTag` `descriptionTag` `templateTag`
- `property.tags`
  `propertyTag` `typeTag` `staticTag` `defaultTag` `aliasTag` `nameTag` `descriptionTag` `templateTag`
- `interface.tags`
  `interfaceTag` `extendsTag` `templateTag` `nameTag` `descriptionTag`
- `enum.tags`
  `enumTag` `nameTag` `descriptionTag`
- `typedef.tags`
  `typedefTag` `typeTag` `templateTag` `aliasTag` `nameTag` `descriptionTag` `seeTag` `exampleTag`

默认关闭的作者、版本、示例、别名等标签可以按需打开；全局值通过 `annotation.global` 提供。

更完整的字段说明、默认值表和配置示例见：

- [docs/CONFIG_REFERENCE.md](docs/CONFIG_REFERENCE.md)
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## 输出示例

### 方法

```ts
/**
 * @name load
 * @method
 * @access protected
 * @static
 * @async
 * @param {string} source
 * @returns {Promise<Result<T>>}
 * @throws {Error}
 * @template T
 * @description
 */
```

### 类

```ts
/**
 * @name Repository
 * @class
 * @abstract
 * @extends BaseRepository<T>
 * @implements {Disposable}
 * @implements {Cacheable<T>}
 * @template T
 * @description
 */
```

### 属性

```ts
/**
 * @name count
 * @property
 * @type {number}
 * @static
 * @default 0
 * @description
 */
```

## 命令反馈

命令执行时，插件会尽量明确告诉你发生了什么：

- 当前行没有可解析声明时，会提示未找到可生成目标
- `skip` 模式遇到已有注释时，会提示已跳过
- 批量生成完成时，会提示实际应用数量，以及跳过的已有注释数量
- 编辑应用失败时，会给出错误提示，而不是静默失败

## 示例文件

可以直接参考 [examples/feature-coverage.ts](examples/feature-coverage.ts)，这个文件覆盖了当前 AST 解析器的主要场景。

## 架构说明

当前运行链路已经收成四步：

1. 读取并合并设置
2. AST 解析为统一的 `DocTarget`
3. 构建注释文本
4. 插入、替换或跳过已有注释

详细说明见：

- [docs/CONFIG_REFERENCE.md](docs/CONFIG_REFERENCE.md)
- [docs/SIMPLIFIED_ARCHITECTURE.md](docs/SIMPLIFIED_ARCHITECTURE.md)
- [docs/PERFORMANCE_NOTES.md](docs/PERFORMANCE_NOTES.md)
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## 性能结论

当前实现已经是 AST-only 主路径，并且做了两层优化：

- 复用 `AstParser` 的 `ts-morph` 项目实例
- 按文档 `URI + version` 缓存解析后的目标列表

本仓库本地热启动测试结果大致是：

- 约 49 行：平均 `7.11ms`
- 约 490 行：平均 `15.13ms`
- 约 2450 行：平均 `79.78ms`

所以对这个插件场景来说，AST 是可接受的，主要优化点不在“退回正则”，而在“减少重复解析和重复建模”。
