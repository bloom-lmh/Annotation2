import {
    createConnection,
    TextDocuments,
    DiagnosticSeverity,
    InitializeParams,
    TextDocumentSyncKind,
    ProposedFeatures,
    InitializeResult,
} from 'vscode-languageserver/node';

import {
    TextDocument
} from 'vscode-languageserver-textdocument';

// 创建 VSCode 语言服务器连接
const connection = createConnection(ProposedFeatures.all);

// 创建文档管理器
const documents = new TextDocuments(TextDocument);

// 处理初始化请求
// 连接初始化
connection.onInitialize((params: InitializeParams) => {
    console.log("aaa");

    // 获取客户端所支持的功能，包括代码补全、高亮等
    const capabilities = params.capabilities;
    const result: InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Full,
            hoverProvider: true,
            completionProvider: { resolveProvider: true },
            definitionProvider: true,
            documentFormattingProvider: true,
        }
    };

    return result;
});

// 监听文档内容更改并提供诊断信息（错误提示）
documents.onDidChangeContent((change) => {

    console.log("a");

});

// 处理其他 LSP 功能，如自动补全、代码跳转等

// 启动文档监听
documents.listen(connection);

// 启动连接
connection.listen();
