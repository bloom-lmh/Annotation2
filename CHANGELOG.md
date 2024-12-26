# 更新日志 / Change Log

## [1.0.3] - 2024-12-26
### 添加
- 添加了基于抽象语法树的解析机制，提高了成员识别能力，但基于抽象语法树的生成性能较差.
- Introduced an abstract syntax tree-based parsing mechanism, improving member recognition ability, although the performance of AST generation is not optimal.

### 更改
- 优化了正则表达式，使其能够正确匹配多行方法体并提取其中的异常类型.
- Optimized the regular expression to correctly match multi-line method bodies and extract the exception types within them.
- 更新了 Markdown 中英文文档的链接.
- Updated the English documentation links in the Markdown files.

### 修复
- 修复了 `parseMethod` 正则无法匹配方法体中 `throw` 异常的问题.
- Fixed the issue where the `parseMethod` regular expression could not match `throw` exceptions in method bodies.
