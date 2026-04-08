# Performance Notes

## Current Conclusion

The current AST-first pipeline is fast enough for a VS Code annotation extension.

The main risk was not AST itself, but repeated setup work:

- creating a fresh `ts-morph` project for every parse
- reparsing the same document multiple times across commands
- rebuilding declaration lists separately for single-target and batch generation

Those costs have now been reduced by:

- reusing `AstParser` project instances
- caching parsed targets per document URI and version in `DocGenerationService`
- making `parseAtLine()` reuse the `parseAll()` result shape

## Local Measurements

Measured locally on April 4, 2026 in this repository after the parser reuse change.

Work included:

1. parse source text into AST
2. collect `DocTarget` entries
3. build JSDoc blocks for every target

Warm runs after initial setup:

- `feature-coverage.input.ts` repeated once
  - about 49 lines
  - average: about `7.11ms`
  - p95: about `8.74ms`
- same fixture repeated 10 times
  - about 490 lines
  - average: about `15.13ms`
  - p95: about `18.15ms`
- same fixture repeated 50 times
  - about 2450 lines
  - average: about `79.78ms`
  - p95: about `111.61ms`

## Practical Guidance

- For normal editor usage, AST is acceptable and gives much better coverage than regex.
- If performance becomes an issue later, optimize caching and incremental reuse first.
- Do not bring regex back as the main path just for speed unless profiling shows AST is the real bottleneck.
