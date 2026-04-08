# Troubleshooting

## No Comment Was Generated

If the command reports that no target was found, the current cursor position usually does not resolve to a supported declaration.

Check these cases first:

- the cursor is on a blank line or inside a block body instead of on the declaration line
- the declaration kind is not currently supported
- the file is not TypeScript or JavaScript
- the document has syntax errors severe enough to affect AST parsing

What to try:

- move the cursor to the declaration line itself
- try `addAnnotations` to confirm whether other declarations in the file are detected
- test with [examples/feature-coverage.ts](../examples/feature-coverage.ts) to compare behavior

## The Command Says It Was Skipped

If the command says generation was skipped, the current mode is probably `skip` and a JSDoc block already exists above the declaration.

Check:

- `annotation.behavior.mode`
- project config files such as `annotation.config.json`
- workspace settings that may override your expected value

If you want regeneration instead:

- set `mode` to `replace` to overwrite existing comments
- set `mode` to `insert` to keep the old block and add a new one

## Some Tags Are Missing

Missing tags are usually caused by one of these reasons:

- the tag switch is disabled for that declaration kind
- the information cannot be inferred from the AST
- the declaration kind does not use that tag

Examples:

- `@throws` only appears when thrown errors can be inferred
- `@template` only appears for generic declarations
- `@returns` is omitted for constructors
- author and version tags need both a tag switch and a global value

See [CONFIG_REFERENCE.md](./CONFIG_REFERENCE.md) for the per-kind default switches.

## Configuration Does Not Seem to Apply

The extension merges settings from multiple places. Later sources override earlier ones:

1. built-in defaults
2. project config files
3. VS Code workspace settings

If a setting looks wrong:

- check whether the same field is set in both a project file and workspace settings
- make sure the JSON path matches the supported structure
- confirm you are editing the workspace that contains the current file

Project config file names supported by the extension:

- `annotation.config.json`
- `.annotationrc.json`
- `.vscode/annotation.json`

## Existing Comments Are Replaced Unexpectedly

This usually means `behavior.mode` is set to `replace`.

If you want to preserve existing comments:

- use `skip` to keep them untouched
- use `insert` if you explicitly want a second generated block

## Batch Generation Did Less Than Expected

`addAnnotations` only generates comments for supported declarations. It can also skip declarations that already have docblocks when `mode` is `skip`.

If the batch count is lower than expected:

- check whether some declarations already have JSDoc blocks
- confirm the unsupported declarations are not currently outside the AST mapper coverage
- compare the file against [examples/feature-coverage.ts](../examples/feature-coverage.ts)

## AST Coverage Is Not the Same as Full Semantic Analysis

This extension is AST-first, not a full type-checking documentation engine.

That means:

- some inferred values are syntax-driven
- complex runtime behavior is not analyzed
- `throws` and other derived tags are best-effort

This tradeoff keeps generation fast and predictable while covering the main declaration shapes reliably.

## Legacy Strategy Settings

Older configs may still contain `strategy` fields from previous designs.

Current behavior:

- AST is the active main path
- legacy `strategy` values are ignored for backward compatibility
- changing `strategy` no longer changes runtime behavior

## When to Report a Bug

It is worth reporting a bug when:

- a supported declaration kind is consistently missed
- a tag that should be present is never generated under the default config
- `replace` or `skip` behaves differently from the documented rules
- a minimal reproducible file behaves differently from [examples/feature-coverage.ts](../examples/feature-coverage.ts)
