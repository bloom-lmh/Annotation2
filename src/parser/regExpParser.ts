import { SourceFile } from "ts-morph";
import { MemberInfo } from "./memberInfo";
import { MemberParser } from "./memberParser";

/**
 * 正则解析器
 */
export class RegExpParser extends MemberParser {
    public parseMemberInfo(sourceFile: SourceFile, memberName: string, lineNumber: number): MemberInfo {
        throw new Error("Method not implemented.");
    }
}