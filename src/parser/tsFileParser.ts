import * as ts from "typescript";
import * as fs from "fs";
/**
 * Ts文件解析器
 */
export class TsFileParser {
    // 解析ts或js文件
    public paserTsFile(filePath: string): ts.SourceFile {
        // 文件存在性检测
        if (!fs.existsSync(filePath)) {
            throw new Error("文件不存在！")
        }
        // 获取文件内容
        const fileContent = fs.readFileSync(filePath, "utf-8");
        // 解析 TypeScript 文件
        const sourceFile = ts.createSourceFile(
            filePath,
            fileContent,
            ts.ScriptTarget.ESNext,
            true
        );
        if (!sourceFile) {
            throw new Error("文件解析失败！")
        }
        return sourceFile
    }
}