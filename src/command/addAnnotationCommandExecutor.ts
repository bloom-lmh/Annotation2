import * as vscode from 'vscode';
import { DocGenerationService } from '../core/docGenerationService';
import { ContextPicker } from '../utils/contextPicker';
import { CommentEditHelper } from './commentEditHelper';
import { commandMessages } from './commandMessages';
import { CommandExecutor } from './commandExecutor';

export class AddAnnotationCommandExecutor implements CommandExecutor {
  async executeCommand(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage(commandMessages.editorUnavailable);
      return;
    }

    const { lineNumber, document } = new ContextPicker(editor).pick();
    const projectPath = vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath;
    if (!projectPath) {
      vscode.window.showInformationMessage(commandMessages.workspaceUnavailable);
      return;
    }

    const result = new DocGenerationService(document, projectPath).createSingleResult(lineNumber);
    if (!result.operation) {
      const message =
        result.status === 'skipped-existing'
          ? commandMessages.skippedExisting
          : commandMessages.noDeclarationFound;
      vscode.window.showInformationMessage(message);
      return;
    }

    const applied = await CommentEditHelper.applyOperations(editor, [result.operation]);
    if (!applied) {
      vscode.window.showErrorMessage(commandMessages.editFailed);
    }
  }
}
