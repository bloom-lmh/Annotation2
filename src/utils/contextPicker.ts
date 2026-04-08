import * as vscode from 'vscode';

export interface PickContext {
  fileName: string;
  lineNumber: number;
  wordText: string;
  document: vscode.TextDocument;
}

export class ContextPicker {
  constructor(private readonly editor: vscode.TextEditor) {}

  public pickCursorWordText(): string {
    const position = this.editor.selection.active;
    const wordRange = this.editor.document.getWordRangeAtPosition(position);
    return wordRange ? this.editor.document.getText(wordRange) : '';
  }

  public pickFileName(): string {
    return this.editor.document.fileName;
  }

  public pickLineNumber(): number {
    return this.editor.selection.active.line + 1;
  }

  public pickDocument(): vscode.TextDocument {
    return this.editor.document;
  }

  public pick(): PickContext {
    return {
      fileName: this.pickFileName(),
      wordText: this.pickCursorWordText(),
      lineNumber: this.pickLineNumber(),
      document: this.pickDocument(),
    };
  }
}
