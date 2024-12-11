import { Project, SourceFile } from "ts-morph";
/**
 * Ts文件解析器
 */
export class TsFileUtil {
    // 解析ts或js文件
    public paserTsFile(filePath: string): SourceFile {
        // 初始化 Project
        const project = new Project();
        // 加载文件
        const sourceFile = project.addSourceFileAtPath(filePath);
        // 返回加载的文件
        return sourceFile
    }
}