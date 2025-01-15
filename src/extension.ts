import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ContextPicker } from './picker/contextPicker';
import { AstHelper, MemberDeclaration } from './ast/astHelper';
import { AstParser } from './ast/astParser';
import path from 'path';
import { Config } from './config/config';
import { AnnotationFactory } from './annotation/annotationFactory';
import { WorkspaceUtil } from './utils/workspaceUtil';
import { PanelFactory } from './panel/panelFactory';
import { ConfigManager } from './config/configManager';
import { RegExpParser } from './parser/regExpParser';
import { MemberHandlerChain } from './member/menberHandlerChain';
import { RegExpMemberHandleStrategy } from './member/regExpMemberHandleStrategy';
import { AddAnnotationCommandExecutor } from './command/addAnnotationCommandExecutor';
import { AddAnnotationsCommandExecutor } from './command/addAnnotationsCommandExecutor';

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

  // 生成单行注释
  const disposable2 = vscode.commands.registerCommand('addAnnotation', async () => {
    new AddAnnotationCommandExecutor().executeCommand()
  });
  const disposable3 = vscode.commands.registerCommand('addAnnotations', async () => {
    new AddAnnotationsCommandExecutor().executeCommand()
  })

  // 生成全文件注释
  const disposable4 = vscode.commands.registerCommand('test', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage("编辑器获取失败!");
      return;
    }

    const document = editor.document;
    const sourceFile = new AstParser().parseByText(document.getText());

    if (!sourceFile) {
      vscode.window.showErrorMessage("抽象语法树解析失败!");
      return;
    }

    const allDeclarations = [
      ...sourceFile.getFunctions(),
      ...sourceFile.getEnums(),
      ...sourceFile.getInterfaces(),
      ...sourceFile.getTypeAliases()
    ];

    const classDeclarations = sourceFile.getClasses();

    const regExpParser = new RegExpParser();
    const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath;


    // 加载用户配置
    let config: Config = ConfigManager.getConfig(projectPath);

    // 开始注释生成
    await editor.edit(editBuilder => {
      // 遍历所有类的声明
      classDeclarations.forEach(classDeclaration => {
        // 为类本身添加注释
        addMemberComment(classDeclaration, document, regExpParser, editBuilder, config);

        // 为类中的每个方法添加注释
        classDeclaration.getMethods().forEach(method => {
          addMemberComment(method, document, regExpParser, editBuilder, config);
        });

        // 为类中的每个属性添加注释
        classDeclaration.getProperties().forEach(property => {
          addMemberComment(property, document, regExpParser, editBuilder, config);
        });

        // 为类中的每个构造函数添加注释
        classDeclaration.getConstructors().forEach(constructor => {
          addMemberComment(constructor, document, regExpParser, editBuilder, config);
        });
      });

      // 遍历类以外的其他声明（例如函数、枚举等）
      allDeclarations.forEach(declaration => {
        addMemberComment(declaration, document, regExpParser, editBuilder, config);
      });
    });

    vscode.window.showInformationMessage("注释已成功添加到所有成员!");
  });


  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);
  context.subscriptions.push(disposable4);
  context.subscriptions.push(workspaceFolderDisposable);
}
/**
    * 为指定成员添加注释
    */
function addMemberComment(
  memberDeclaration: MemberDeclaration,
  document: vscode.TextDocument,
  regExpParser: RegExpParser,
  editBuilder: vscode.TextEditorEdit,
  config: Config
) {
  const member = regExpParser.parseMember(memberDeclaration, document);

  if (member && memberDeclaration) {
    // 获取注释
    const annotation = AnnotationFactory.getAnnotation(member, config);
    const jsdoc = annotation?.buildJSDoc() || '';

    // 获取成员的起始位置
    const startLine = memberDeclaration.getStartLineNumber() - 1 || 0;  // 注意行号从1开始，需要减1
    const position = new vscode.Position(startLine, 0);  // 在当前行的开始插入

    // 插入注释到成员之前
    editBuilder.insert(position, `${jsdoc}\n`);
  }
}
export function deactivate() {

}
