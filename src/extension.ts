import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ContextPicker } from './picker/contextPicker';
import { AstUtil } from './utils/astUtil';
import { TsFileParser } from './parser/tsFileParser';
import chokidar from 'chokidar';
import path from 'path';
import { ConfigManager } from './config/configManager';
import { FileWatcher } from './file/fileWatcher';
import { Config } from './config/config';
import { AnnotationFactory } from './annotation/annotationFactory';
import { JsDocGenerator } from './generator/jsDocGenerator';
// 插件激活
export function activate(context: ExtensionContext) {


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
            let config: Config = ConfigManager.get(filePath)
            // 调用注解工厂创建注解
            let annotation = AnnotationFactory.getAnnotation(memberDeclaration, config)
            if (!annotation) {
                vscode.window.showInformationMessage("获取注解对象失败！")
                return
            }
            // 调用jsdoc生成器创建jsdoc注释
            let jsdoc = new JsDocGenerator(annotation).generateJsDoc()
            // 调用注入器注入注解

            const selection = editor.selection;
            const startLine = selection.start.line;
            const position = new vscode.Position(startLine, 0); // 在当前行的开始插入

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
