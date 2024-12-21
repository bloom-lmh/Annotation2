import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ContextPicker } from './picker/contextPicker';
import { AstUtil } from './utils/astUtil';
import { TsFileParser } from './parser/tsFileParser';
import path from 'path';
import { Config } from './config/config';
import { AnnotationFactory } from './annotation/annotationFactory';
import { WorkspaceUtil } from './utils/workspaceUtil';
import { PanelFactory } from './panel/panelFactory';
import { ConfigManager } from './config/configManager';
import { ClassDeclaration } from 'ts-morph';
// 插件激活
export function activate(context: ExtensionContext) {
    // 获取工作区路径，加载配置
    const projectPaths = WorkspaceUtil.getProjectPaths()
    // 设置配置
    projectPaths.forEach(projectPath => {
        ConfigManager.addConfig(projectPath)
    })
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
    // 生成单行注释
    const disposable2 = vscode.commands.registerCommand('addSingleAnnotation', async () => {
        let st = new Date()
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("编辑器获取失败")
            return
        }
        // 创建拾取器对象拾取上下文信息
        let { lineNumber, wordText, fileName: filePath, document } = new ContextPicker(editor).pick()
        // 创建ts文件解析工具解析ts文件
        // let sourceFile = new TsFileParser().parseTsFile(filePath)
        let sourceFile = new TsFileParser().getSourceFileFromText(document.getText())
        // 获取类、方法或者成员信息
        let memberDeclaration = new AstUtil().getMemberInfo(sourceFile, wordText, lineNumber)
        if (!memberDeclaration) {
            vscode.window.showInformationMessage("获取成员信息失败")
            return
        }
        // 获取文件所属项目路径
        const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath
        if (!projectPath) {
            vscode.window.showInformationMessage("获取项目路径失败")
            return
        }
        // 加载用户配置
        // let config: Config = ConfigLoader.loadConfig(path.join(projectPath, "annotation.config.json"))
        let config: Config = ConfigManager.getConfig(projectPath)

        // 调用注解工厂创建注解
        let annotation = AnnotationFactory.getAnnotation(memberDeclaration, config)

        // 构建jsdoc
        let jsdoc = annotation?.buildJSDoc() || ''

        // 调用注入器注入注解
        const position = new vscode.Position(memberDeclaration.getStartLineNumber() - 1 || lineNumber - 1, 0); // 在当前行的开始插入
        // 执行编辑
        await editor.edit(editBuilder => {
            editBuilder.insert(position, `${jsdoc}\n`);
        });
        let et = new Date()
        console.log(et.getTime() - st.getTime() + 'ms');
    });
    // 生成全文件注释
    // 生成全文件注释
    const disposable3 = vscode.commands.registerCommand('addAllAnnotations', async () => {
        const st = new Date();
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("编辑器获取失败");
            return;
        }

        const document = editor.document;
        const filePath = document.uri.fsPath;

        // 创建 ts 文件解析工具解析 ts 文件
        const sourceFile = new TsFileParser().getSourceFileFromText(document.getText());

        // 获取文件所属项目路径
        const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath;
        if (!projectPath) {
            vscode.window.showInformationMessage("获取项目路径失败");
            return;
        }

        // 加载用户配置
        let config: Config = ConfigManager.getConfig(projectPath);

        // 获取文件中的所有成员
        const memberDeclarations = [
            ...sourceFile.getClasses(),
            ...sourceFile.getInterfaces(),
            ...sourceFile.getEnums(),
            ...sourceFile.getFunctions(),
            ...sourceFile.getTypeAliases(),
        ];

        // 批量处理成员
        const edits: vscode.TextEdit[] = [];

        // 遍历每个类
        for (const classDeclaration of sourceFile.getClasses()) {
            const className = classDeclaration.getName();
            const startLine = classDeclaration.getStartLineNumber() - 1;

            // 为类本身生成注释
            const classAnnotation = AnnotationFactory.getAnnotation(classDeclaration, config);
            const classJsdoc = classAnnotation?.buildJSDoc() || '';
            const classPosition = new vscode.Position(startLine, 0);
            edits.push(vscode.TextEdit.insert(classPosition, `${classJsdoc}\n`));

            // 为类中的方法和属性生成注释
            for (const method of classDeclaration.getMethods()) {
                const methodJsdoc = AnnotationFactory.getAnnotation(method, config)?.buildJSDoc() || '';
                const methodPosition = new vscode.Position(method.getStartLineNumber() - 1, 0); // 方法起始位置
                edits.push(vscode.TextEdit.insert(methodPosition, `${methodJsdoc}\n`));
            }

            for (const property of classDeclaration.getProperties()) {
                const propertyJsdoc = AnnotationFactory.getAnnotation(property, config)?.buildJSDoc() || '';
                const propertyPosition = new vscode.Position(property.getStartLineNumber() - 1, 0); // 属性起始位置
                edits.push(vscode.TextEdit.insert(propertyPosition, `${propertyJsdoc}\n`));
            }
        }

        // 批量处理其他成员
        for (const memberDeclaration of memberDeclarations) {
            // 排除类中的方法和属性，避免重复注释
            if (memberDeclaration instanceof ClassDeclaration) continue;

            const memberName = memberDeclaration.getName();
            const startLine = memberDeclaration.getStartLineNumber() - 1;

            // 为每个成员生成注释
            const annotation = AnnotationFactory.getAnnotation(memberDeclaration, config);
            const jsdoc = annotation?.buildJSDoc() || '';
            const position = new vscode.Position(startLine, 0);
            edits.push(vscode.TextEdit.insert(position, `${jsdoc}\n`));
        }

        // 执行编辑
        if (edits.length > 0) {
            await editor.edit(editBuilder => {
                for (const edit of edits) {
                    editBuilder.insert(edit.range.start, edit.newText);
                }
            });
            let et = new Date();
            console.log('总共耗时: ' + (et.getTime() - st.getTime()) + 'ms');
        } else {
            vscode.window.showInformationMessage("没有找到可生成注释的成员");
        }
    });
    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
    context.subscriptions.push(workspaceFolderDisposable);
}

export function deactivate() {

}
