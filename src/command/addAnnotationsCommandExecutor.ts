import { CommandExecutor } from "./commandExecutor";
import { AnnotationFactory } from "../annotation/annotationFactory";
import { AstHelper } from "../ast/astHelper";
import { AstParser } from "../ast/astParser";
import { Config } from "../config/config copy";
import { ConfigManager } from "../config/configManager";
import { MemberHandlerChain } from "../member/menberHandlerChain";
import { RegExpMemberHandleStrategy } from "../member/regExpMemberHandleStrategy";
import { ContextPicker } from "../picker/contextPicker";
import * as vscode from 'vscode';
export class AddAnnotationsCommandExecutor implements CommandExecutor {
  async executeCommand(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("编辑器获取失败!");
      return;
    }

    // 创建拾取器对象拾取上下文信息
    let { lineNumber, wordText, document } = new ContextPicker(editor).pick()
    const sourceFile = new AstParser().parseByText(document.getText());
    if (!sourceFile) {
      vscode.window.showErrorMessage("抽象语法树解析失败!");
      return;
    }
    // 获取全部的Declaration
    const allDeclarations = new AstHelper().getAllMemberDeclaration(sourceFile)
    // 创建成员处理器链
    const memberHandlerChain = new MemberHandlerChain()
    // 采用正则策略 对象映射为成员对象
    const members = await memberHandlerChain.batchHandleAll(allDeclarations, new RegExpMemberHandleStrategy(document))
    // 获取文件所属项目路径
    const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath;
    // 加载用户配置
    let config: Config = ConfigManager.getConfig(projectPath)
    // 调用注解工厂创建注解将全部的成员对象转换为对应的注解对象
    let annotations = AnnotationFactory.getAnnotations(members, config)

    // 执行编辑
    editor.edit(editBuilder => {
      // 创建注解并生成
      annotations.forEach(annotation => {
        // 构建jsdoc
        let jsdoc = annotation?.buildJSDoc() || ''

        // 调用注入器注入注解
        const position = new vscode.Position(annotation?.getStartLineNumber() || lineNumber - 1, 0); // 在当前行的开始插入
        editBuilder.insert(position, `${jsdoc}\n`);
      })

    });
    vscode.window.showInformationMessage("注释已成功添加到所有成员!");
  }
}