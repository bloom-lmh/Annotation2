# JSDoc Annotation

- [GitHub](https://github.com/bloom-lmh/Annotation2)
- [Gitee](https://gitee.com/bloom_lmh/annotation2)
- [Chinese README](https://github.com/bloom-lmh/Annotation2/blob/master/README.md)
- [Change Log](./CHANGELOG.md)

## Overview

JSDoc Annotation is a VS Code extension that generates JSDoc and TSDoc style comment blocks for TypeScript and JavaScript declarations.

The current implementation uses an AST-only main path. The goal is no longer "fast regex first", but better coverage, more predictable output, and a simpler maintenance model.

## Supported Targets

- classes
- constructors
- functions
- class methods
- interface method signatures
- properties
- interface property signatures
- enums
- interfaces
- type aliases
- generic declarations
- async methods and thrown errors when they can be inferred from the AST

## Commands

| Command | Shortcut | Description |
| --- | --- | --- |
| `addAnnotation` | `Alt+\` | Generate a docblock for the declaration under the cursor |
| `addAnnotations` | `Ctrl+Alt+\` | Generate docblocks for all supported declarations in the current file |
| `openConfigConsole` | `Alt+Shift+\` | Open extension settings |

## Configuration

The main runtime behavior setting is `annotation.behavior.mode`.

- `insert`: always insert a new docblock
- `replace`: replace an existing JSDoc block above the declaration
- `skip`: skip generation when a JSDoc block already exists

You can configure tag switches per target kind in VS Code settings, or in project files such as:

- `annotation.config.json`
- `.annotationrc.json`
- `.vscode/annotation.json`

Example:

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

## Default Tag Switches

These are the main tag switches enabled by default today, matching the extension defaults in `package.json`:

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

Author, version, alias, example, and similar metadata tags are off by default unless you enable them explicitly. Shared values come from `annotation.global`.

For the full field list, default tables, and config recipes, see:

- [docs/CONFIG_REFERENCE.md](docs/CONFIG_REFERENCE.md)
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## Output Samples

### Method

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

### Class

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

### Property

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

## Command Feedback

Commands now try to explain the outcome clearly:

- when the current line has no parsable declaration, the command reports that no target was found
- when `skip` mode leaves an existing docblock untouched, the command reports that it was skipped
- batch generation reports both the number of applied changes and the number of existing docblocks skipped
- failed editor writes surface an error message instead of failing silently

## Example

See [examples/feature-coverage.ts](examples/feature-coverage.ts) for a compact sample that exercises the current AST parser.

## Architecture

The runtime pipeline is:

1. load merged settings
2. parse declarations into `DocTarget`
3. build the docblock
4. insert, replace, or skip existing comments

More detail:

- [docs/CONFIG_REFERENCE.md](docs/CONFIG_REFERENCE.md)
- [docs/SIMPLIFIED_ARCHITECTURE.md](docs/SIMPLIFIED_ARCHITECTURE.md)
- [docs/PERFORMANCE_NOTES.md](docs/PERFORMANCE_NOTES.md)
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## Performance

This extension uses an AST-only main path with parser reuse and document-level target caching.

Local warm-run measurements in this repository:

- about 49 lines: average `7.11ms`
- about 490 lines: average `15.13ms`
- about 2450 lines: average `79.78ms`

For this extension, the main optimization target is reducing repeated parsing and repeated modeling work, not falling back to regex as the primary path.
