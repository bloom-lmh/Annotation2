import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import path from 'path';
import { Config } from './config/config copy';
import { WorkspaceUtil } from './utils/workspaceUtil';
import { PanelFactory } from './panel/panelFactory';
import { ConfigManager } from './config/configManager';
import { AddAnnotationCommandExecutor } from './command/addAnnotationCommandExecutor';
import { AddAnnotationsCommandExecutor } from './command/addAnnotationsCommandExecutor';
import { ConfigLoader } from './config/configLoader';

// 插件激活
export function activate(context: ExtensionContext) {
  // 获取工作区路径，加载配置
  const projectPaths = WorkspaceUtil.getProjectPaths()
  // 设置配置
  projectPaths.forEach(projectPath => {
    ConfigManager.addConfig(projectPath)
  })

  // 模板路径
  const templatePath = path.join(context.extensionPath, 'out/webview', "template.html")
  // 创建面板
  let panel: vscode.WebviewPanel | null
  // 监听项目变化,动态注入配置
  const workspaceFolderDisposable = vscode.workspace.onDidChangeWorkspaceFolders((event) => {
    let addProjectConfigs: { projectPath: string; projectConfig: Config | undefined; }[] = []
    let removeProjectPaths: string[] = []
    // 存入项目配置
    event.added.forEach(folder => {
      let projectPath = folder.uri.fsPath
      ConfigManager.addConfig(projectPath)
      // 获取项目配置
      let projectConfig = ConfigManager.getConfig(projectPath)
      addProjectConfigs.push({ projectPath, projectConfig })
    });
    // 移除项目配置
    event.removed.forEach((folder) => {
      let projectPath = folder.uri.fsPath
      ConfigManager.removeConfig(projectPath)
      // 通知移除项目配置
      removeProjectPaths.push(projectPath)
    });

    if (panel) {
      if (addProjectConfigs && addProjectConfigs.length > 0) {
        panel.webview.postMessage({ command: 'addProjectConfig', data: addProjectConfigs });
      }
      if (removeProjectPaths && removeProjectPaths.length > 0) {
        panel.webview.postMessage({ command: 'removeProjectConfig', data: removeProjectPaths });
      }
    }
  });


  // 打开配置面板
  const disposable1 = vscode.commands.registerCommand('openConfigConsole', async () => {
    // 获取项目路径
    const projectPaths = WorkspaceUtil.getProjectPaths()

    panel = PanelFactory.getConfigPanel(templatePath)

    let projectConfigs: { [key: string]: Config } = {}
    // 循环获取配置
    projectPaths.forEach(projectPath => {
      let projectConfig = ConfigManager.getConfig(projectPath)
      if (projectConfig) {
        projectConfigs[projectPath] = projectConfig
      }
    })
    // 向 Webview 传递数据
    panel.webview.postMessage({ command: 'initProjectConfig', data: projectConfigs });
  })
  const disposable2 = vscode.commands.registerCommand('addAnnotation', async () => {
    new AddAnnotationCommandExecutor().executeCommand()
  });
  const disposable3 = vscode.commands.registerCommand('addAnnotations', async () => {
    new AddAnnotationsCommandExecutor().executeCommand()
  })
  const disposable4 = vscode.commands.registerCommand('test', async () => {
    // 加载配置
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("编辑器获取失败!")
      return
    }
    // 获取文件所属项目路径
    const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath
    if (!projectPath) {
      vscode.window.showInformationMessage("获取项目路径失败")
      return
    }
    let config = new ConfigLoader().loadConfig(projectPath + "/annotation.config.json")
    console.log(config);

    // 获取项目路径
    vscode.window.showInformationMessage("test")
  });


  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);
  context.subscriptions.push(disposable4);
  context.subscriptions.push(workspaceFolderDisposable);
}
export function deactivate() {

}
