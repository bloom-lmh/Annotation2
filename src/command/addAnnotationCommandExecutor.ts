import { AnnotationFactory } from "../annotation/annotationFactory";
import { AstHelper } from "../ast/astHelper";
import { AstParser } from "../ast/astParser";
import { Config } from "../config/config copy";
import { ConfigManager } from "../config/configManager";
import { MemberHandlerChain } from "../member/menberHandlerChain";
import { RegExpMemberHandleStrategy } from "../member/regExpMemberHandleStrategy";
import { ContextPicker } from "../picker/contextPicker";
import { CommandExecutor } from "./commandExecutor";
import * as vscode from 'vscode';
export class AddAnnotationCommandExecutor implements CommandExecutor {
  async executeCommand(): Promise<void> {
    // 获取编辑器
    const editor = vscode.window.activeTextEditor;
    // 编辑器失败
    if (!editor) {
      vscode.window.showErrorMessage("编辑器获取失败!")
      return
    }
    // 创建拾取器对象拾取上下文信息
    let { lineNumber, wordText, document } = new ContextPicker(editor).pick()
    // 创建ts文件解析工具解析ts文件
    let sourceFile = new AstParser().parseByText(document.getText())
    // 解析为抽象语法树失败
    if (!sourceFile) {
      vscode.window.showErrorMessage("抽象语法树解析失败!")
      return
    }
    // 获取类、方法或者成员信息
    let memberDeclaration = new AstHelper().getOneMemberDeclarationSync(sourceFile, wordText, lineNumber)
    //let memberDeclaration = await new AstHelper().getOneMemberDeclaration(sourceFile, wordText, lineNumber)

    // 成员信息获取失败
    if (!memberDeclaration) {
      vscode.window.showErrorMessage("获取成员声明失败!")
      return
    }
    let memberHandlerChain = new MemberHandlerChain()
    let member = await memberHandlerChain.handle(memberDeclaration, new RegExpMemberHandleStrategy(document))

    // 成员获取失败
    if (!member) {
      vscode.window.showErrorMessage("获取成员信息失败!")
      return
    }
    // 获取文件所属项目路径
    const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath
    // 获取项目路径失败
    /*  if (!projectPath) {
       vscode.window.showInformationMessage("获取项目路径失败!")
       return
     } */
    // 加载用户配置
    let config: Config = ConfigManager.getConfig(projectPath)

    // 调用注解工厂创建注解
    let annotation = AnnotationFactory.getAnnotation(member, config)

    // 构建jsdoc
    let jsdoc = annotation?.buildJSDoc() || ''

    // 调用注入器注入注解
    const position = new vscode.Position(memberDeclaration.getStartLineNumber() - 1 || lineNumber - 1, 0); // 在当前行的开始插入
    // 执行编辑
    await editor.edit(editBuilder => {
      editBuilder.insert(position, `${jsdoc}\n`);
    });
  }
}