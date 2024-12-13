import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ContextPicker } from './picker/contextPicker';
import { AstUtil } from './utils/astUtil';
import { TsFileParser } from './parser/tsFileParser';
import chokidar from 'chokidar';
import path from 'path';
import { ConfigManager } from './config/configManager';
// 插件激活
export function activate(context: ExtensionContext) {
    /* let projectPaths: Array<string> = []
    const workspaceFolder = vscode.workspace.workspaceFolders;
    if (workspaceFolder && workspaceFolder.length > 0) {
        // 返回工作区根目录路径
        projectPaths = workspaceFolder.map(folder =>
            path.join(folder.uri.fsPath, 'annotation.config.json')
        );
    }

    const watcher = chokidar.watch(projectPaths)
    watcher.on('add', (path) => {
        console.log(path);
    }) */

    // 配置管理器打开文件监听
    ConfigManager.startConfigWatch()
    // 生成单行注释
    const disposable = vscode.commands.registerCommand('addSingleAnnotation', async () => {
        try {
            let st = new Date()
            const editor = vscode.window.activeTextEditor;
            //AssertUtil.objectIsNull(editor, NotifiyUtil.showErrorMessage("编辑器获取失败"))
            if (!editor) {
                vscode.window.showInformationMessage("编辑器获取失败")
                return
            }
            // 创建拾取器对象
            const contextPicker = new ContextPicker(editor)
            // 拾取上下文信息
            let { lineNumber, wordText, fileName: filePath } = contextPicker.pick()
            // 创建ts文件解析工具
            const tsFileParser = new TsFileParser()
            // 解析ts文件
            let sourceFile = tsFileParser.parseTsFile(filePath)
            // 获取类、方法或者成员信息
            let memberDeclaration = new AstUtil().getMemberInfo(sourceFile, wordText, lineNumber)
            // 加载用户配置
            // 1.1获取当前工作区路径



            /*  const selection = editor.selection;
             const startLine = selection.start.line;
             const position = new vscode.Position(startLine, 0); // 在当前行的开始插入
 
             // 执行编辑
             await editor.edit(editBuilder => {
                 editBuilder.insert(position, `11\n`);
             }); */


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
