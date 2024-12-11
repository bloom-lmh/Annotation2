import { workspace, ExtensionContext } from 'vscode';
import { ClassAnnotationDirector } from './annotation/annotationDirector';
import { ClassAnnotationBuilder } from './annotation/annotationBuilder';
import { ClassAnnotation } from './annotation/annotation';
import * as vscode from 'vscode';
import { TsFileParser } from './parser/tsFileParser';
// 插件激活
export function activate(context: ExtensionContext) {
    // 创建ts文件解析器
    const tsFileParser = new TsFileParser()
    // 生成单行注释
    const disposable = vscode.commands.registerCommand('addSingleAnnotation', async () => {
        try {
            /*  tsFileParser.paserTsFile('.xxx') */
        } catch (error: any) {
            const errorMessage = typeof error === 'string' ? error : error.message;
            vscode.window.showErrorMessage(errorMessage)
        }
    });

    context.subscriptions.push(disposable);

}

export function deactivate() {

}
