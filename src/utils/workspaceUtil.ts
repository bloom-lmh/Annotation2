import path from 'path';
import * as vscode from 'vscode';

export class WorkspaceUtil {
  public static getProjectPaths(relativePath = ''): Array<string> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders?.length) {
      return [];
    }

    return workspaceFolders.map(folder => path.join(folder.uri.fsPath, relativePath));
  }
}
