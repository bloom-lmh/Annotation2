import { readFileSync } from 'fs';
import * as vscode from 'vscode';
import { WorkspaceUtil } from '../utils/workspaceUtil';
import { ConfigManager } from '../config/configManager';
import { Config } from '../config/config';
/**
 * 面板工厂
 */
export class PanelFactory {
  private static panel: vscode.WebviewPanel | null
  public static getConfigPanel(templatePath: string): vscode.WebviewPanel {
    if (this.panel) {
      // 如果 WebviewPanel 已存在，则先销毁之前的面板
      this.panel.dispose();
    }
    if (!this.panel || this.panel.dispose()) {
      // 创建 WebView 面板
      this.panel = vscode.window.createWebviewPanel(
        'customHtmlPanel',  // Webview 类型
        '配置面板',  // 面板标题
        vscode.ViewColumn.Active,  // 显示在第一个列
        {
          enableScripts: true, // 允许脚本执行
          retainContextWhenHidden: true // 保持上下文，即使面板不可见
        }
      );
      // 获取 HTML 文件路径并转化为 WebView 可用的 URI
      const content = readFileSync(templatePath).toString()
      // 设置 WebView 的 HTML 内容
      this.panel.webview.html = content;
      // 监听 WebView 发来的消息
      this.panel.webview.onDidReceiveMessage(message => {
        switch (message.command) {
          case 'submitConfig':
            let projectConfigs: { [key: string]: Config } = JSON.parse(message.message)

            // 将配置存入管理机
            for (const [projectPath, projectConfig] of Object.entries(projectConfigs)) {
              ConfigManager.addConfig(projectPath, projectConfig)
            }
            return;
        }
      });
    }
    // 监听销毁事件
    this.panel.onDidDispose(() => {
      this.panel = null; // 销毁后清空引用
    });
    return this.panel
  }
}