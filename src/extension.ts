import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ContextPicker } from './picker/contextPicker';
import { AstUtil } from './utils/astUtil';
import { TsFileParser } from './parser/tsFileParser';
import path from 'path';
import { Config } from './config/config';
import { AnnotationFactory } from './annotation/annotationFactory';
import { ConfigLoader } from './config/configLoader';
import { WorkspaceUtil } from './utils/workspaceUtil';
import { PanelFactory } from './panel/panelFactory';
import { ConfigManager } from './config/configManager';
// 插件激活
export function activate(context: ExtensionContext) {
    // 获取工作区路径，加载配置
    const projectPaths = WorkspaceUtil.getProjectPaths()
    // 设置配置
    projectPaths.forEach(projectPath => {
        ConfigManager.addConfig(projectPath)
    })
    /*  ConfigManager.visitAll() */
    // 模板路径
    const templatePath = path.join(context.extensionPath, 'src/webview', "template.html")
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

        console.log(addProjectConfigs.length, removeProjectPaths.length);
        if (panel) {
            if (addProjectConfigs && addProjectConfigs.length > 0) {
                console.log("A");
                panel.webview.postMessage({ command: 'addProjectConfig', data: addProjectConfigs });
            }
            if (removeProjectPaths && removeProjectPaths.length > 0) {
                console.log("B");
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
    // 生成单行注释
    const disposable2 = vscode.commands.registerCommand('addSingleAnnotation', async () => {
        try {
            let st = new Date()
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage("编辑器获取失败")
                return
            }
            // 创建拾取器对象拾取上下文信息
            let { lineNumber, wordText, fileName: filePath } = new ContextPicker(editor).pick()
            // 创建ts文件解析工具解析ts文件
            let sourceFile = new TsFileParser().parseTsFile(filePath)
            // 获取类、方法或者成员信息
            let memberDeclaration = new AstUtil().getMemberInfo(sourceFile, wordText, lineNumber)
            // 获取文件所属项目路径
            const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath
            if (!projectPath) {
                vscode.window.showInformationMessage("获取项目路径失败")
                return
            }
            // 加载用户配置
            // let config: Config = ConfigLoader.loadConfig(path.join(projectPath, "annotation.config.json"))
            let config: Config = ConfigManager.getConfig(projectPath)
            console.log(config);

            // 调用注解工厂创建注解
            let annotation = AnnotationFactory.getAnnotation(memberDeclaration, config)

            // 构建jsdoc
            let jsdoc = annotation?.buildJSDoc() || ''

            // 调用注入器注入注解
            /*  const selection = editor.selection;
             const startLine = selection.start.line; */
            const position = new vscode.Position(lineNumber - 1, 0); // 在当前行的开始插入
            // 执行编辑
            await editor.edit(editBuilder => {
                editBuilder.insert(position, `${jsdoc}\n`);
            });

            let et = new Date()
            console.log(et.getTime() - st.getTime() + 'ms');
        } catch (error: any) {
            const errorMessage = typeof error === 'string' ? error : error.message;
            vscode.window.showErrorMessage(errorMessage)
        }
    });

    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(workspaceFolderDisposable);
}

export function deactivate() {

}
