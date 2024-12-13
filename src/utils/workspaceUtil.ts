import path from 'path';
import * as vscode from 'vscode';
export class WorkspaceUtil {
    // 获取工作区路径，可以加入相对路径
    public static getProjectPaths(relativePath?: string): Array<string> {
        // 项目路径数组
        let projectPaths: Array<string> = []
        relativePath = relativePath || ''
        // 遍历工作区目录
        const workspaceFolder = vscode.workspace.workspaceFolders;
        if (workspaceFolder && workspaceFolder.length > 0) {
            // 返回工作区根目录路径，若有后缀则拼接
            projectPaths = workspaceFolder.map(folder =>
                path.join(folder.uri.fsPath, relativePath)
            );
        }
        return projectPaths
    }
}