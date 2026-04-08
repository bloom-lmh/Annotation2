# Simplified Architecture

## Why Refactor

The current implementation spreads one feature across too many layers:

- AST parsing
- member handler chain
- strategy dispatch
- member model classes
- annotation model classes
- annotation factory
- config classes

That makes small feature changes expensive. Adding one new tag or one new declaration kind often requires touching many files.

## Target Shape

The plugin can be reduced to one straightforward pipeline:

1. `settings`
   Read workspace or project configuration into one plain object.
2. `target parser`
   Parse the selected declaration into one unified `DocTarget`.
3. `doc builder`
   Convert `DocTarget + settings` into a JSDoc block through a pure function.
4. `edit apply`
   Insert, replace, or skip existing docblocks.

## New Core Modules

- `src/core/annotationSettings.ts`
  Loads and merges defaults, project config, and VS Code settings.
- `src/core/docTarget.ts`
  Unified data model for all supported declarations.
- `src/core/docTargetParser.ts`
  AST-first parser that returns `DocTarget` objects.
- `src/core/docBuilder.ts`
  Pure string builder for JSDoc output.
- `src/core/docGenerationService.ts`
  Small orchestration layer used by commands.
- `src/command/commentEditHelper.ts`
  Plans and applies insert, replace, or skip edit operations against the editor.

## Refactor Plan

### Phase 1

- Keep existing commands and tests.
- Move the hot path to the new core pipeline.
- Leave old factory or handler code in place temporarily to reduce migration risk.

### Phase 2

- Delete unused member handler chain and annotation factory path.
- Remove redundant member and annotation classes.
- Collapse config classes into plain defaults plus types.

Status:
- Completed.
- The command hot path now depends on `src/core/*`, `src/ast/astParser.ts`, and `src/command/commentEditHelper.ts`.
- Legacy folders for annotation classes, member classes, handler chains, handle strategies, and old config classes have been removed.

### Phase 3

- Trim package settings and docs.
- Add focused parser and builder unit tests.
- Make command feedback reflect the actual outcome instead of treating every `null` the same way.

Status:
- Completed for the current scope.
- `annotation.behavior` is reduced to the fields that still affect runtime behavior.
- Legacy `strategy` values are ignored for backward compatibility, but are no longer documented as active behavior.
- Commands now distinguish between `no-target`, `skipped-existing`, and successful edits.

## Command Outcome Model

The command layer no longer treats every missing operation as the same result.

- `ready`
  At least one edit operation is ready to apply.
- `no-target`
  The current cursor or file did not resolve to a supported declaration.
- `skipped-existing`
  A declaration was found, but the configured `skip` mode intentionally left the existing JSDoc in place.

This keeps the core pipeline simple while making extension feedback much easier to understand.

## Expected Benefits

- Fewer files touched per feature.
- Easier debugging because data flows in one direction.
- Simpler test setup.
- Lower chance of AST and regex behavior drifting apart.
