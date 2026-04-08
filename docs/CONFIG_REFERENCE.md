# Config Reference

## Overview

This document describes the runtime configuration model used by JSDoc Annotation.

The extension merges settings from:

1. built-in defaults
2. project config files
3. VS Code workspace settings

Supported project config file names:

- `annotation.config.json`
- `.annotationrc.json`
- `.vscode/annotation.json`

## Top-Level Shape

```json
{
  "behavior": {
    "mode": "insert"
  },
  "global": {
    "authorInfo": "",
    "versionInfo": "",
    "licenseInfo": "",
    "copyrightInfo": ""
  },
  "class": {
    "tags": {}
  },
  "method": {
    "tags": {}
  },
  "property": {
    "tags": {}
  },
  "interface": {
    "tags": {}
  },
  "enum": {
    "tags": {}
  },
  "typedef": {
    "tags": {}
  }
}
```

## Behavior

`behavior.mode` controls how the extension applies generated docblocks:

- `insert`
  Always inserts a new docblock above the declaration.
- `replace`
  Replaces the nearest existing JSDoc block above the declaration.
- `skip`
  Leaves an existing JSDoc block untouched and reports that it was skipped.

## Global Values

`global` holds shared values that some tags can read from:

- `authorInfo`
- `versionInfo`
- `licenseInfo`
- `copyrightInfo`

These values do nothing by themselves until the matching tag switches are enabled.

## Tag Switch Defaults

### `class.tags`

| Tag | Default |
| --- | --- |
| `classTag` | `true` |
| `abstractTag` | `true` |
| `extendsTag` | `true` |
| `implementsTag` | `true` |
| `authorTag` | `false` |
| `aliasTag` | `false` |
| `versionTag` | `false` |
| `nameTag` | `true` |
| `descriptionTag` | `true` |
| `seeTag` | `false` |
| `exampleTag` | `false` |
| `templateTag` | `true` |

### `method.tags`

| Tag | Default |
| --- | --- |
| `asyncTag` | `true` |
| `functionTag` | `true` |
| `constructorTag` | `true` |
| `throwsTag` | `true` |
| `paramsTag` | `true` |
| `returnsTag` | `true` |
| `staticTag` | `true` |
| `accessTag` | `true` |
| `authorTag` | `false` |
| `aliasTag` | `false` |
| `versionTag` | `false` |
| `nameTag` | `true` |
| `descriptionTag` | `true` |
| `seeTag` | `false` |
| `exampleTag` | `false` |
| `templateTag` | `true` |

### `property.tags`

| Tag | Default |
| --- | --- |
| `propertyTag` | `true` |
| `typeTag` | `true` |
| `staticTag` | `true` |
| `defaultTag` | `true` |
| `aliasTag` | `true` |
| `nameTag` | `true` |
| `descriptionTag` | `true` |
| `seeTag` | `false` |
| `exampleTag` | `false` |
| `templateTag` | `true` |

### `interface.tags`

| Tag | Default |
| --- | --- |
| `interfaceTag` | `true` |
| `extendsTag` | `true` |
| `authorTag` | `false` |
| `versionTag` | `false` |
| `templateTag` | `true` |
| `aliasTag` | `false` |
| `nameTag` | `true` |
| `descriptionTag` | `true` |
| `seeTag` | `false` |
| `exampleTag` | `false` |

### `enum.tags`

| Tag | Default |
| --- | --- |
| `enumTag` | `true` |
| `aliasTag` | `false` |
| `nameTag` | `true` |
| `descriptionTag` | `true` |
| `seeTag` | `false` |
| `exampleTag` | `false` |

### `typedef.tags`

| Tag | Default |
| --- | --- |
| `typedefTag` | `true` |
| `typeTag` | `true` |
| `templateTag` | `true` |
| `aliasTag` | `true` |
| `nameTag` | `true` |
| `descriptionTag` | `true` |
| `seeTag` | `true` |
| `exampleTag` | `true` |

## Example Configs

### Replace Existing Comments

```json
{
  "behavior": {
    "mode": "replace"
  }
}
```

### Keep Existing Comments Untouched

```json
{
  "behavior": {
    "mode": "skip"
  }
}
```

### Add Author and Version to Class Blocks

```json
{
  "global": {
    "authorInfo": "team-docs",
    "versionInfo": "1.2.0"
  },
  "class": {
    "tags": {
      "authorTag": true,
      "versionTag": true
    }
  }
}
```

### Reduce Method Output

```json
{
  "method": {
    "tags": {
      "descriptionTag": false,
      "returnsTag": false,
      "throwsTag": false
    }
  }
}
```

## Notes

- The extension no longer documents regex strategy switching as an active runtime feature.
- Legacy `strategy` values are ignored for backward compatibility.
- The command layer distinguishes between:
  - no supported declaration found
  - skipped because of `skip` mode
  - edits applied successfully

For common runtime issues and diagnosis tips, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
