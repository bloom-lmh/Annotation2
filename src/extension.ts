import * as vscode from 'vscode';
import { ExtensionContext } from 'vscode';
import { AddAnnotationCommandExecutor } from './command/addAnnotationCommandExecutor';
import { AddAnnotationsCommandExecutor } from './command/addAnnotationsCommandExecutor';

export function activate(context: ExtensionContext) {
  const addAnnotationDisposable = vscode.commands.registerCommand('addAnnotation', async () => {
    await new AddAnnotationCommandExecutor().executeCommand();
  });

  const addAnnotationsDisposable = vscode.commands.registerCommand('addAnnotations', async () => {
    await new AddAnnotationsCommandExecutor().executeCommand();
  });

  const openConfigDisposable = vscode.commands.registerCommand('openConfigConsole', async () => {
    await vscode.commands.executeCommand(
      'workbench.action.openSettings',
      '@ext:SWUST-WEBLAB-LMH.annotation annotation',
    );
  });

  context.subscriptions.push(addAnnotationDisposable, addAnnotationsDisposable, openConfigDisposable);
}

export function deactivate() {}
