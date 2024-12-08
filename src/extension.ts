// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from 'path';
import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;
// 激活插件
export function activate(context: vscode.ExtensionContext) {
    // 设置服务器模块路径
    const serverModule = path.join(context.extensionPath, 'server.js');

    // 设置服务器选项
    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc }
    };
    // 设置客户端选项
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'typescript' }, { scheme: 'file', language: 'javascript' }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.ts')
        }
    };
    // 创建语言客户端
    client = new LanguageClient(
        'typescriptLanguageServer',
        'TypeScript Language Server',
        serverOptions,
        clientOptions
    );
    // 启动客户端
    client.start();
    const disposable = vscode.commands.registerCommand('annotation2.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Annotation2!');
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
