import * as assert from 'assert';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as vscode from 'vscode';

export class TestWorkspace {
  public static async getRootPath(): Promise<string> {
    const folder = vscode.workspace.workspaceFolders?.[0];
    assert.ok(folder, 'Expected an open workspace folder for extension tests.');
    return folder.uri.fsPath;
  }

  public static async prepareFixtureCopy(
    fixtureRelativePath: string,
    targetFileName: string,
  ): Promise<string> {
    const rootPath = await this.getRootPath();
    const fixturePath = path.join(rootPath, fixtureRelativePath);
    const sandboxDir = path.join(rootPath, '.tmp-tests');

    await fs.mkdir(sandboxDir, { recursive: true });

    const targetPath = path.join(sandboxDir, targetFileName);
    await fs.copyFile(fixturePath, targetPath);
    return targetPath;
  }

  public static async openFile(filePath: string): Promise<vscode.TextEditor> {
    const document = await vscode.workspace.openTextDocument(filePath);
    return vscode.window.showTextDocument(document);
  }

  public static async placeCursor(editor: vscode.TextEditor, marker: string): Promise<void> {
    const documentText = editor.document.getText();
    const offset = documentText.indexOf(marker);
    assert.notStrictEqual(offset, -1, `Marker "${marker}" not found in fixture.`);

    const position = editor.document.positionAt(offset);
    editor.selection = new vscode.Selection(position, position);
    editor.revealRange(new vscode.Range(position, position));
  }

  public static async writeProjectConfig(config: unknown): Promise<string> {
    const rootPath = await this.getRootPath();
    const configPath = path.join(rootPath, 'annotation.config.json');
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return configPath;
  }

  public static async removeIfExists(filePath: string): Promise<void> {
    try {
      await fs.rm(filePath, { recursive: true, force: true });
    } catch {
      // Best effort cleanup for test artifacts.
    }
  }

  public static async closeAllEditors(): Promise<void> {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  }
}
