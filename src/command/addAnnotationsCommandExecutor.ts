import * as vscode from 'vscode';
import { DocGenerationService } from '../core/docGenerationService';
import { ContextPicker } from '../utils/contextPicker';
import { CommentEditHelper } from './commentEditHelper';
import { commandMessages } from './commandMessages';
import { CommandExecutor } from './commandExecutor';

export class AddAnnotationsCommandExecutor implements CommandExecutor {
  async executeCommand(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage(commandMessages.editorUnavailable);
      return;
    }

    const { document } = new ContextPicker(editor).pick();
    const projectPath = vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath;
    if (!projectPath) {
      vscode.window.showInformationMessage(commandMessages.workspaceUnavailable);
      return;
    }

    const result = new DocGenerationService(document, projectPath).createAllResult();
    if (result.status === 'no-target') {
      vscode.window.showInformationMessage(commandMessages.noDeclarationFound);
      return;
    }

    if (result.status === 'skipped-existing') {
      vscode.window.showInformationMessage(commandMessages.batchSkippedExisting(result.targetCount));
      return;
    }

    const applied = await CommentEditHelper.applyOperations(editor, result.operations);
    if (!applied) {
      vscode.window.showErrorMessage(commandMessages.editFailed);
      return;
    }

    vscode.window.showInformationMessage(
      commandMessages.batchCompleted(result.readyCount, result.skippedExistingCount),
    );
  }
}
