# 简介
- [Github地址](https://github.com/bloom-lmh/Annotation2)
- [Gitee地址](https://github.com/bloom-lmh/Annotation2)
- [English document link](./README_EN.md)
## 什么是 JSDoc Annotation？

JSDoc Annotation 是一款轻量级、可高度定制的注释生成插件，旨在为您的 TypeScript 或 JavaScript 文件中的类、方法、属性等成员，快速生成符合 [JSDoc](https://jsdoc.bootcss.com/) 风格的注释。通过简便的命令操作，它让开发过程更加高效、流畅，极大提升代码注释的生成效率，带来未来感十足的开发体验。

## 特色功能

JSDoc Annotation参考了市面上热门的注释生成插件，如IEAD中Easy Javadoc的和VSCODE中的koroFileHeader插件，并结合了他们的优点而诞生。无论你是后端程序员还是前端程序员，都能让你在开发中有熟悉的感觉。其功能包括:

1.快捷生成单个成员注释：类、方法、属性、枚举、接口、自定义属性的JSDoc注释
2.快捷生成全文件类、方法、属性、枚举、接口、自定义属性的JSDoc注释
3.进行个性化配置
  - 对类、方法、属性、枚举、接口、自定义属性注释标签进行配置
  - 全局标签设置
  - 自定义翻译接口（维护中）
  - 系统配置（维护中）
- 支持配置的迁移和复用，让你无论在什么设备上都可以使用自己习惯的注释生成方式（维护中）

## 兼容性
JSDoc Annotation目前只能支持最新的VSCODE版本，对低版本的VSCODE的兼容处理还在进行中。当然也希望用户更新最新的VSCODE来使用，这样或许有更好的体验，[VSCODE官网](https://code.visualstudio.com/)。

## 性能
JSDoc Annotation采用了抽象语法树结合正则的方式来进行类、方法等成员的解析和注释生成。即保证了准确性又保证了优越的性能。经过统计：
- 生成单个注释(1500行代码)大约需要10-50ms
- 生成全文档注释(1500行代码)大约需要50-200ms

## 命令清单
JSDoc Annotation目前支持的命令如下：
| 命令          | 功能                                                         |
| ------------- | ------------------------------------------------------------ |
| `alt+\`       | 对类、方法、属性、枚举、接口、自定义类型生成块级JSDOC注释    |
| `ctrl+alt+\` | 对全文件的类、方法、属性、枚举、接口、自定义类型生成块级JSDOC注释 |
| `ctrl+shift+\`| 打开配置面板|

--- 
# 基本使用

## 单个成员生成注释
对于单个成员生成注释十分简单，只需要将光标对准类、方法、属性然后按下`alt+\`即可生成块级注释

### **生成类注释**
![生成类注释演示](https://s3.bmp.ovh/imgs/2024/12/24/e0ad6a4974683468.gif)

```JavaScript
class SuperMan { }
interface Fly { }
interface Attack { }
/**
 * @name Man
 * @abstract
 * @class
 * @implements {Fly}
 * @implements {Attack}
 * @extends SuperMan
 * @description
 */
abstract class Man extends SuperMan implements Fly, Attack {}
```

### **生成方法注释**

![生成方法注释演示](https://s3.bmp.ovh/imgs/2024/12/24/4c3780bb47e68c0e.gif)

```javascript
/**
 * @name fetchData
 * @function
 * @access public
 * @static
 * @async
 * @param {string} name
 * @param {number} age
 * @returns {Promise}
 * @description
 */
public static async fetchData(name: string, age: number): Promise<string> {
  let a = 1
  try {
    console.log("a");
  } catch (error) {
    throw new Error("test error")
  }
  if (a === 1) {
    throw new Error("asd")
  }
  return "aa"
}
```

### **生成属性注释**

![生成属性注释演示](https://s3.bmp.ovh/imgs/2024/12/24/f291ba8b5de0f2a2.gif)

```javascript
/**
 * @name name
 * @type {string}
 * @access private
 * @static
 * @default "小芳"
 * @description
 */
private static name: string = "小芳"
```

### **生成枚举注释**

![生成枚举注释演示](https://s3.bmp.ovh/imgs/2024/12/24/abd1aaf96d6d2213.gif)

```javascript
/**
 * @name Color
 * @enum
 * @description
 */
enum Color {

}
```
### **生成接口注释**

![生成接口注释演示](https://s3.bmp.ovh/imgs/2024/12/24/4931b813631514b5.gif)

```javascript
interface A { }
interface B { }
/**
 * @name C
 * @interface
 * @extends A
 * @extends B
 * @description
 */
interface C extends A, B { }
```
### **生成自定义类型注释**

![生成自定义类型注释演示](https://s3.bmp.ovh/imgs/2024/12/24/5b8e309514ba0221.gif)

```javascript
/**
 * @name myname
 * @typedef {string | number} myname
 * @description
 */
type myname = string | number;
```
###

## 全文档成员生成注释
JSDoc Annotation不仅支持生成单个成员的注释，还可以一键对全文件所有成员添加注释，使用命令`ctrl+alt+\`即可为全文件的的方法、类、属性等成员生成注释
![全文档成员生成注释演示](https://s3.bmp.ovh/imgs/2024/12/24/5124b70c283d00ba.gif)

--- 
# 配置

## 默认配置

JSDoc Annotation支持用户个性化的配置，但是为了开箱即用，JSDoc Annotation对常用的选项进行了默认设置，即约定大于配置。用户不必进行过多的配置或者可以不需要进行配置就能享受到目前市面上最流行的注释方式。
默认配置的标签如下所示：
```javascript
/* 类注释默认支持的标签 */
@name;@class;@abstract;@extends;@implements
/* 方法注释默认支持的标签 */
@name；@params；@async；@function；@constructor；
@throwsTag；@paramsTag；@returnsTag； @staticTag
/* 属性注释默认支持的标签 */
@name;@propertyTag；@typeTag；@staticTag；@defaultTag
/* 枚举注释默认支持的标签 */
@name;@enum;
/* 自定义类型注释默认支持的标签 */
@name;@type
/* 接口类型注释默认支持的标签 */
@name;@interface;@extends
```

## 进阶配置
当然如果你想进行配置，JSDoc Annotation也支持个性化的配置方案，使用命令`shift+alt+\`即可打开配置面板。
![配置面版界面](https://s3.bmp.ovh/imgs/2024/12/24/4e83b3e8c0a2cfab.jpg)


## 配置案例
比如，如果你希望当前项目在生成类注释时加上作者标签，你可以这样进行配置
1. 从项目选择下拉框中选择当前项目
2. 然后在类注释配置中选择打开作者标签
3. 在全局配置中写上你想要的作者名

![配置案例演示](https://s3.bmp.ovh/imgs/2024/12/24/f96b0b278637fb29.gif)

# 维护与支持

目前JSDoc Annotation版本为1.0.0，还有一些BUG还没有暴露，所以后续我会对插件进行更充分的测试，并对出现的BUG进行维护。
项目源码已经放到github上，希望大家可以为我提出一些建议，我会根据建议进行改进。
如果喜欢的朋友也可以为我点点赞，这也是我前进的动力。




