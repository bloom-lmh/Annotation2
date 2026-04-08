import { Project, SourceFile } from 'ts-morph';

export class AstParser {
  private static readonly fileProject = new Project({
    compilerOptions: { skipLibCheck: true },
    skipAddingFilesFromTsConfig: true,
  });

  private static readonly textProject = new Project({
    compilerOptions: { skipLibCheck: true },
    skipAddingFilesFromTsConfig: true,
  });

  public parseByFilePath(filePath: string): SourceFile {
    return AstParser.fileProject.getSourceFile(filePath) || AstParser.fileProject.addSourceFileAtPath(filePath);
  }

  public parseByText(text: string, filePath = 'tempFile.ts'): SourceFile {
    const existing = AstParser.textProject.getSourceFile(filePath);
    if (existing) {
      existing.replaceWithText(text);
      return existing;
    }

    return AstParser.textProject.createSourceFile(filePath, text, { overwrite: true });
  }
}
