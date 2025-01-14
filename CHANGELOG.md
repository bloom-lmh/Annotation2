# 更新日志 / Change Log

## [1.0.3] - 2024-12-26
### 添加/add
- 添加了基于抽象语法树的解析机制，提高了成员识别能力，但基于抽象语法树的生成性能较差。
- Introduced an abstract syntax tree-based parsing mechanism, improving member recognition ability, although the performance of AST generation is not optimal.

### 更改/update
- 优化了正则表达式，使其能够正确匹配多行方法体并提取其中的异常类型。
- Optimized the regular expression to correctly match multi-line method bodies and extract the exception types within them.

### 修复/fix
- 修复了 `parseMethod` 正则无法匹配方法体中 `throw` 异常的问题。
- Fixed the issue where the `parseMethod` regular expression could not match `throw` exceptions in method bodies.

## [1.0.4] - 2024-12-27
### 更改/update
- 更新了 Markdown 中英文文档的链接。
- Updated the English documentation links in the Markdown files.


## [1.0.5] - 2024-1-09
### 修复/fix
- 修复了没有项目路径的文件不可生成注释的问题。
- Fixed an issue where files without project paths could not generate comments.

### 更改/update
- 优化代码结构，引入职责链模式处理注释成员生成。
- Optimize code structure and introduce chain of responsibility mode to handle comment member generation.

## [1.0.6] - 2024-1-09 (开发中......)
### 修复/fix
- 采用默认注解进行填充的方法修复了对未知复杂代码结构不可生成注解的问题，提高了代码的健壮性，但这只是一种简单处理的方式，后续会尽量包括更多的代码结构支持。
- Filling with default annotations fixes the problem of not generating annotations for unknown complex code structures and improves the robustness of the code, but this is only a simple way to deal with it and will include more code structure support in the future.
### 更改/update
- 对全文件注解代码进行优化，全文件注解生成速度较上一版本有所提升。
- The full-file annotation code is optimized, and the generation speed of full-file annotation is improved compared with the previous version.


后续开发计划
- 添加对泛型的支持，消除Interface extends bug
- 配置方式多元化 vscode配置（使用文件的方式链接到文件） < json配置 (json配置生成器来生成、也允许用户手动去添加)
- *提高弹性和健壮性允许错误的发生而不影响大部分行为的执行（只是简单的处理了）
- *优化多个注释生成代码
- 解决生成注释的格式问题
- 多元化配置方式以及配置项目的确定
- 加入翻译功能以及单词映射
- 加入get set 方法
- 加入文件注释，包括代码行数统计