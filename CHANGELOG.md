# Changelog

## 1.0.7 - April 8, 2026

### Added

- Added AST-first support for a broader set of declaration kinds, including classes, constructors, functions, class methods, interface method signatures, properties, interface property signatures, enums, interfaces, and type aliases.
- Added project-level configuration loading through `annotation.config.json`, `.annotationrc.json`, and `.vscode/annotation.json`.
- Added `insert`, `replace`, and `skip` edit modes for generated docblocks.
- Added extension regression tests, core parser and builder tests, and AST parser cache tests.
- Added focused documentation pages:
  - `docs/CONFIG_REFERENCE.md`
  - `docs/PERFORMANCE_NOTES.md`
  - `docs/SIMPLIFIED_ARCHITECTURE.md`
  - `docs/TROUBLESHOOTING.md`

### Changed

- Replaced the old regex-first hot path with an AST-only main path.
- Simplified the runtime architecture to a smaller core pipeline:
  - settings
  - target parser
  - doc builder
  - edit apply
- Reworked command feedback so commands now distinguish between:
  - no supported declaration found
  - skipped because of `skip` mode
  - edits applied successfully
- Reused `ts-morph` parser state and added document-level target caching to reduce repeated parsing work.
- Reorganized README content and split detailed configuration and troubleshooting guidance into dedicated docs.

### Removed

- Removed the legacy member handler chain, annotation factory path, old config classes, and other no-longer-used architecture layers from the active code path.
- Removed regex strategy switching as a documented runtime feature. Legacy `strategy` values are now ignored for backward compatibility.

## 1.0.6 - January 15, 2025

### Fixed

- Improved fallback handling for unknown or more complex code structures by filling with default annotations when precise generation was not possible.

### Changed

- Optimized full-file annotation generation so batch generation was faster than in the previous version.

## 1.0.5 - January 9, 2025

### Fixed

- Fixed an issue where files without project paths could not generate comments.

### Changed

- Refined the code structure and introduced a chain-of-responsibility style member generation flow.

## 1.0.4 - December 27, 2024

### Changed

- Updated English documentation links in the Markdown files.

## 1.0.3 - December 26, 2024

### Added

- Added an abstract syntax tree based parsing mechanism to improve member recognition coverage.

### Changed

- Optimized regular expressions to better match multi-line method bodies and extract thrown exception types.

### Fixed

- Fixed an issue where the `parseMethod` regular expression could not match `throw` exceptions inside method bodies.
