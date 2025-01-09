Here’s the translation of your document from Chinese to English:

---

# Introduction
- [Github Link](https://github.com/bloom-lmh/Annotation2)
- [Gitee Link](https://gitee.com/bloom_lmh/annotation2)
- [中文文档链接](https://github.com/bloom-lmh/Annotation2/blob/master/README.md)
- [官方网站](https://bloom-lmh.github.io/swust-weblab-site/)

## What is JSDoc Annotation?

JSDoc Annotation is a lightweight, highly customizable comment generation plugin designed to quickly generate JSDoc-style comments for classes, methods, properties, and other members in your TypeScript or JavaScript files. With simple command operations, it enhances the development process, making it more efficient and seamless, significantly improving the comment generation speed, and providing a futuristic development experience.

## Key Features

JSDoc Annotation is inspired by popular comment generation plugins on the market, such as Easy Javadoc in IEAD and the koroFileHeader plugin in VS Code, combining the best aspects of both. Whether you're a backend or frontend developer, it gives you a familiar feeling during development. Its features include:

1. Quick generation of individual member comments: JSDoc comments for classes, methods, properties, enums, interfaces, and custom types.
2. Quick generation of comments for the entire file's classes, methods, properties, enums, interfaces, and custom types.
3. Personalization options:
   - Configure comment tags for classes, methods, properties, enums, interfaces, and custom types.
   - Global tag settings.
   - Custom translation interface (under maintenance).
   - System configuration (under maintenance).
   - Support for configuration migration and reuse, allowing you to use your preferred comment generation style on any device (under maintenance).

## Compatibility

JSDoc Annotation currently only supports the latest version of VS Code. Compatibility for older versions of VS Code is still being developed. We recommend users update to the latest version of VS Code for a better experience. [VS Code Official Site](https://code.visualstudio.com/).

## Performance
The JSDoc annotation uses a combination of Abstract Syntax Tree (AST) and regular expressions to parse and generate annotations for members such as classes and methods. This ensures both accuracy and superior performance. According to statistics:

- Generating a single annotation (1500 lines of code) takes approximately 10-50ms
- Generating the entire document's annotations (1500 lines of code) takes approximately 50-200ms

## Command List

The following commands are currently supported by JSDoc Annotation:
| Command         | Function                                                       |
| --------------- | ------------------------------------------------------------- |
| `alt+\`         | Generate block-level JSDoc comments for classes, methods, properties, enums, interfaces, and custom types |
| `ctrl+alt+\`    | Generate block-level JSDoc comments for all classes, methods, properties, enums, interfaces, and custom types in the file |
| `ctrl+shift+\`  | Open the configuration panel |

# Installation and Download

### Search in the VSCode editor

You can search for "JSDoc Annotation" in the VSCode Marketplace to download and use it.

### Download VSIX Package from VSCode Marketplace

You can download the corresponding JSDoc Annotation installation package, such as `annotation-1.0.0.vsix`, from the VSCode Marketplace and import it locally.
 However, note that using the installation package means you will not receive future updates or new features!

# Basic Usage

## Generate Comments for a Single Member

Generating comments for a single member is very simple. Just place the cursor on the class, method, or property and press `alt+\` to generate the block-level comment.

### **Generate Class Comment**
![Generate Class Comment Demo](https://s3.bmp.ovh/imgs/2024/12/24/e0ad6a4974683468.gif)

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

### **Generate Method Comment**

![Generate Method Comment Demo](https://s3.bmp.ovh/imgs/2024/12/24/4c3780bb47e68c0e.gif)

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

### **Generate Property Comment**

![Generate Property Comment Demo](https://s3.bmp.ovh/imgs/2024/12/24/f291ba8b5de0f2a2.gif)

```javascript
/**
 * @name name
 * @type {string}
 * @access private
 * @static
 * @default "Xiaofang"
 * @description
 */
private static name: string = "Xiaofang"
```

### **Generate Enum Comment**

![Generate Enum Comment Demo](https://s3.bmp.ovh/imgs/2024/12/24/abd1aaf96d6d2213.gif)

```javascript
/**
 * @name Color
 * @enum
 * @description
 */
enum Color {

}
```

### **Generate Interface Comment**

![Generate Interface Comment Demo](https://s3.bmp.ovh/imgs/2024/12/24/4931b813631514b5.gif)

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

### **Generate Custom Type Comment**

![Generate Custom Type Comment Demo](https://s3.bmp.ovh/imgs/2024/12/24/5b8e309514ba0221.gif)

```javascript
/**
 * @name myname
 * @typedef {string | number} myname
 * @description
 */
type myname = string | number;
```

### 

## Generate Comments for All Members in the File

JSDoc Annotation not only supports generating comments for individual members but also allows you to generate comments for all members in the entire file with a single command. Use the `ctrl+alt+\` command to generate comments for all methods, classes, properties, etc., in the file.

![Generate All Members Comment Demo](https://s3.bmp.ovh/imgs/2024/12/24/5124b70c283d00ba.gif)

---

# Configuration

## Default Configuration

JSDoc Annotation supports user-specific configurations, but for out-of-the-box use, JSDoc Annotation provides default settings for commonly used options, meaning conventions take precedence over configuration. Users don’t need to configure much or may not need to configure anything at all to enjoy the most popular comment generation style currently available on the market.

The default configuration tags are as follows:

```javascript
/* Default tags for class comments */
@name; @class; @abstract; @extends; @implements
/* Default tags for method comments */
@name; @params; @async; @function; @constructor;
@throwsTag; @paramsTag; @returnsTag; @staticTag
/* Default tags for property comments */
@name; @propertyTag; @typeTag; @staticTag; @defaultTag
/* Default tags for enum comments */
@name; @enum;
/* Default tags for custom type comments */
@name; @type
/* Default tags for interface comments */
@name; @interface; @extends
```

## Advanced Configuration

If you prefer to configure, JSDoc Annotation also supports personalized configuration options. Use the `shift+alt+\` command to open the configuration panel.

![Configuration Panel Interface](https://s3.bmp.ovh/imgs/2024/12/24/4e83b3e8c0a2cfab.jpg)

## Configuration Example

For instance, if you want to add an author tag when generating class comments in your project, you can configure it as follows:
1. Select the current project from the project dropdown.
2. Enable the author tag in the class comment configuration.
3. Write the desired author name in the global configuration.

![Configuration Example Demo](https://s3.bmp.ovh/imgs/2024/12/24/f96b0b278637fb29.gif)

# Maintenance and Support

Currently, JSDoc Annotation version 1.0.5 is available, and some bugs have not yet been exposed. So I will continue testing the plugin and maintaining it for any bugs that appear. The project source code is available on GitHub, and I hope users can provide suggestions, which will help me improve the plugin.

If you like it, please give me a thumbs-up; it’s also my motivation to continue working on this project.

---

Let me know if you'd like any further adjustments!