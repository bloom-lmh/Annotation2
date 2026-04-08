import { SourceFile } from 'ts-morph';
import { DocTarget } from './docTarget';
import { collectSupportedDeclarations } from './docTargetDeclarations';
import { mapDeclarationToDocTarget } from './docTargetMapper';

export class DocTargetParser {
  public parseAll(sourceFile: SourceFile): DocTarget[] {
    return collectSupportedDeclarations(sourceFile)
      .map(declaration => mapDeclarationToDocTarget(declaration))
      .filter((target): target is DocTarget => !!target)
      .sort((left, right) => left.declaration.getStart() - right.declaration.getStart());
  }

  public parseAtLine(sourceFile: SourceFile, lineNumber: number): DocTarget | null {
    return this.findAtLine(this.parseAll(sourceFile), lineNumber);
  }

  public findAtLine(targets: DocTarget[], lineNumber: number): DocTarget | null {
    const zeroBasedLine = lineNumber - 1;

    return (
      targets
        .filter(target => zeroBasedLine >= target.line && zeroBasedLine <= target.endLine)
        .sort((left, right) => {
          const leftSpan = left.endLine - left.line;
          const rightSpan = right.endLine - right.line;
          return leftSpan - rightSpan;
        })[0] || null
    );
  }
}
