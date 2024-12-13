import { SourceFile } from "ts-morph";
import { MemberInfo } from "./memberInfo";

/**
 * 正则解析器
 */
export class RegExpParser {
    public parseMemberInfo(sourceFile: SourceFile, memberName: string, lineNumber: number): MemberInfo {
        throw new Error("Method not implemented.");
    }
}