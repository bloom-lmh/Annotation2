import { workspace, ExtensionContext } from 'vscode';
import { ClassAnnotationDirector } from './annotation/annotationDirector';
import { ClassAnnotationBuilder } from './annotation/annotationBuilder';
import { ClassAnnotation } from './annotation/annotation';
import * as vscode from 'vscode';
import { TsFileParser } from './parser/tsFileParser';
import { ContextPicker, PickContext } from './picker/contextPicker';
import { AssertUtil } from './utils/assertUtil';
import { NotifiyUtil } from './utils/notifyUtil';
import { AstUtil } from './utils/astUtil';
// 插件激活
export function activate(context: ExtensionContext) {


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
            // 创建ts文件解析器
            const tsFileParser = new TsFileParser()
            // 拾取上下文信息
            let { lineNumber, wordText, fileName: filePath } = contextPicker.pick()

            // todo 采用策略模式进行轻解析和重解析
            /* // 解析ts文件
            let sourceFile = tsFileParser.paserTsFile(filePath)
            // 获取类、方法或者成员信息
            let classes = await AstUtil.getMemberInfoByName(sourceFile, wordText, lineNumber)
           console.log(classes); */
            let et = new Date()
            console.log(et.getTime() - st.getTime());




        } catch (error: any) {
            const errorMessage = typeof error === 'string' ? error : error.message;
            vscode.window.showErrorMessage(errorMessage)
        }
    });

    context.subscriptions.push(disposable);

}

export function deactivate() {

}
