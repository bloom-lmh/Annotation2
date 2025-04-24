import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { AddAnnotationCommandExecutor } from './command/addAnnotationCommandExecutor';
import { AddAnnotationsCommandExecutor } from './command/addAnnotationsCommandExecutor';

// 插件激活
export function activate(context: ExtensionContext) {
  const disposable1 = vscode.commands.registerCommand('addAnnotation', async () => {
    new AddAnnotationCommandExecutor().executeCommand();
  });
  const disposable2 = vscode.commands.registerCommand('addAnnotations', async () => {
    new AddAnnotationsCommandExecutor().executeCommand();
  });

  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
}
export function deactivate() {}
