import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ContextPicker } from './picker/contextPicker';
import { AstHelper, MemberDeclaration } from './ast/astHelper';
import { TsFileHelper } from './ast/tsFileHelper';
import path from 'path';
import { Config } from './config/config';
import { AnnotationFactory } from './annotation/annotationFactory';
import { WorkspaceUtil } from './utils/workspaceUtil';
import { PanelFactory } from './panel/panelFactory';
import { ConfigManager } from './config/configManager';
import { RegExpParser } from './parser/regExpParser';
import { AstParser } from './parser/astParser';
import { MemberHandlerChain } from './handler/menberHandlerChain';
import { RegExpMemberHandleStrategy } from './strategy/regExpMemberHandleStrategy';

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
  const disposable2 = vscode.commands.registerCommand('addSingleAnnotation', async () => {
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
    let sourceFile = new TsFileHelper().parseSourceFileByText(document.getText())
    // 解析为抽象语法树失败
    if (!sourceFile) {
      vscode.window.showErrorMessage("抽象语法树解析失败!")
      return
    }
    // 获取类、方法或者成员信息
    let memberDeclaration = new AstHelper().getMemberInfo(sourceFile, wordText, lineNumber)


    // 成员信息获取失败
    if (!memberDeclaration) {
      vscode.window.showErrorMessage("获取成员声明失败!")
      return
    }
    let memberHandlerChain = new MemberHandlerChain()
    let member = memberHandlerChain.handle(memberDeclaration, new RegExpMemberHandleStrategy(document))

    // 采用正则策略获取成员信息
    //let member = new RegExpParser().parseMember(memberDeclaration, document)
    if (!member) {
      member = new AstParser().parseMember(memberDeclaration)
    }
    // 成员获取失败
    if (!member) {
      vscode.window.showErrorMessage("获取成员信息失败!")
      return
    }
    // 获取文件所属项目路径
    const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath
    // 获取项目路径失败
    if (!projectPath) {
      vscode.window.showInformationMessage("获取项目路径失败!")
      return
    }
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
  });


  // 生成全文件注释
  const disposable3 = vscode.commands.registerCommand('addAllAnnotations', async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage("编辑器获取失败!");
      return;
    }

    const document = editor.document;
    const sourceFile = new TsFileHelper().parseSourceFileByText(document.getText());

    if (!sourceFile) {
      vscode.window.showErrorMessage("抽象语法树解析失败!");
      return;
    }

    // 获取所有类、函数、枚举、接口、类型别名的声明
    const allDeclarations = [
      ...sourceFile.getFunctions(),
      ...sourceFile.getEnums(),
      ...sourceFile.getInterfaces(),
      ...sourceFile.getTypeAliases()
    ];

    // 获取所有类的声明
    const classDeclarations = sourceFile.getClasses();

    // 初始化正则解析器
    const regExpParser = new RegExpParser();

    // 获取文件所属项目路径
    const projectPath = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath;

    if (!projectPath) {
      vscode.window.showInformationMessage("获取项目路径失败!");
      return;
    }

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
  const disposable4 = vscode.commands.registerCommand('test', async () => {
    console.log("a");
  })

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
