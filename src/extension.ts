import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ContextPicker } from './picker/contextPicker';
import { AstUtil } from './utils/astUtil';
import { TsFileParser } from './parser/tsFileParser';
import path from 'path';
import { Config } from './config/config';
import { AnnotationFactory } from './annotation/annotationFactory';
import { ConfigLoader } from './config/configLoader';
import { readFileSync } from 'fs';
// 插件激活
export function activate(context: ExtensionContext) {
    const htmlPath = path.join(context.extensionPath, 'src', 'index.html');
    const data = readFileSync(htmlPath).toString()
    // 配置管理器打开文件监听
    //ConfigManager.startConfigWatch()
    // 生成单行注释
    const disposable = vscode.commands.registerCommand('addSingleAnnotation', async () => {
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
            let config: Config = ConfigLoader.loadConfig(path.join(projectPath, "annotation.config.json"))

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

    context.subscriptions.push(disposable);

}

export function deactivate() {

}
