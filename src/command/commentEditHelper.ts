import * as vscode from 'vscode';
import { Node } from 'ts-morph';

export interface CommentEditOperation {
  kind: 'insert' | 'replace';
  line: number;
  position?: vscode.Position;
  range?: vscode.Range;
  text: string;
}

export interface CommentEditPlan {
  status: 'create' | 'skip-existing';
  operation: CommentEditOperation | null;
}

export class CommentEditHelper {
  public static planOperation(
    document: vscode.TextDocument,
    declaration: Node,
    jsdoc: string,
    mode: 'insert' | 'replace' | 'skip',
  ): CommentEditPlan {
    const line = document.positionAt(declaration.getStart()).line;
    const indentation = document.lineAt(line).text.match(/^\s*/)?.[0] || '';
    const formatted = this.indentBlock(jsdoc, indentation);
    const existingRange =
      this.findExistingJsDocRangeFromAst(document, declaration) ||
      this.findExistingJsDocRange(document, line);

    if (existingRange && mode === 'skip') {
      return {
        status: 'skip-existing',
        operation: null,
      };
    }

    if (existingRange && mode === 'replace') {
      return {
        status: 'create',
        operation: {
          kind: 'replace',
          line: existingRange.start.line,
          range: existingRange,
          text: `${formatted}\n`,
        },
      };
    }

    return {
      status: 'create',
      operation: {
        kind: 'insert',
        line,
        position: new vscode.Position(line, 0),
        text: `${formatted}\n`,
      },
    };
  }

  public static createOperation(
    document: vscode.TextDocument,
    declaration: Node,
    jsdoc: string,
    mode: 'insert' | 'replace' | 'skip',
  ): CommentEditOperation | null {
    return this.planOperation(document, declaration, jsdoc, mode).operation;
  }

  public static applyOperations(
    editor: vscode.TextEditor,
    operations: Array<CommentEditOperation | null>,
  ): Thenable<boolean> {
    const validOperations = operations
      .filter((operation): operation is CommentEditOperation => !!operation)
      .sort((left, right) => right.line - left.line);

    return editor.edit(editBuilder => {
      validOperations.forEach(operation => {
        if (operation.kind === 'replace' && operation.range) {
          editBuilder.replace(operation.range, operation.text);
          return;
        }

        if (operation.position) {
          editBuilder.insert(operation.position, operation.text);
        }
      });
    });
  }

  private static indentBlock(block: string, indentation: string): string {
    return block
      .split('\n')
      .map(line => `${indentation}${line}`)
      .join('\n');
  }

  private static findExistingJsDocRange(
    document: vscode.TextDocument,
    declarationStartLine: number,
  ): vscode.Range | null {
    let line = declarationStartLine - 1;
    while (line >= 0 && document.lineAt(line).text.trim() === '') {
      line--;
    }

    if (line < 0 || !document.lineAt(line).text.trim().endsWith('*/')) {
      return null;
    }

    const endLine = line;
    while (line >= 0) {
      const text = document.lineAt(line).text.trim();
      if (text.startsWith('/**')) {
        const end =
          endLine < document.lineCount - 1
            ? new vscode.Position(endLine + 1, 0)
            : new vscode.Position(endLine, document.lineAt(endLine).text.length);
        return new vscode.Range(new vscode.Position(line, 0), end);
      }

      if (!text.startsWith('*') && !text.endsWith('*/')) {
        break;
      }

      line--;
    }

    return null;
  }

  private static findExistingJsDocRangeFromAst(
    document: vscode.TextDocument,
    declaration: Node,
  ): vscode.Range | null {
    if (!('getJsDocs' in declaration) || typeof declaration.getJsDocs !== 'function') {
      return null;
    }

    const jsDocs = declaration.getJsDocs();
    if (!jsDocs.length) {
      return null;
    }

    const jsDoc = jsDocs[jsDocs.length - 1];
    const start = document.positionAt(jsDoc.getStart());
    const endOffset = jsDoc.getEnd();
    const endPosition =
      endOffset < document.getText().length
        ? document.positionAt(endOffset + 1)
        : document.positionAt(endOffset);

    return new vscode.Range(start, endPosition);
  }
}
