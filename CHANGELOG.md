# 更新日志 / Change Log

## [1.0.3] - 2024-12-26
### 添加
- 添加了基于抽象语法树的解析机制，提高了成员识别能力，但基于抽象语法树的生成性能较差.
- Introduced an abstract syntax tree-based parsing mechanism, improving member recognition ability, although the performance of AST generation is not optimal.

### 更改
- 优化了正则表达式，使其能够正确匹配多行方法体并提取其中的异常类型.
- Optimized the regular expression to correctly match multi-line method bodies and extract the exception types within them.

### 修复
- 修复了 `parseMethod` 正则无法匹配方法体中 `throw` 异常的问题.
- Fixed the issue where the `parseMethod` regular expression could not match `throw` exceptions in method bodies.

## [1.0.4] - 2024-12-27
### 更改
- 更新了 Markdown 中英文文档的链接.
- Updated the English documentation links in the Markdown files.


## [1.0.5] - 2024-1-09
### 修复
- 修复了没有项目路径的文件不可生成注释的问题.
- Fixed an issue where files without project paths could not generate comments.

### 更改
- 优化代码结构，引入职责链模式处理注释成员生成。
- Optimize code structure and introduce chain of responsibility mode to handle comment member generation.


后续开发计划
- 解决泛型的问题
- 优化多个注释生成代码
- 多元化配置方式以及配置项目的确定
- 加入翻译功能以及单词映射
- 加入get set 方法
- 加入文件注释，包括代码行数统计