import { SourceFile } from "ts-morph";
import { MemberInfo } from "./memberInfo";

/**
 * 成员解析器
 * @description 解析ts文件中的类、方法和属性成员信息,采用策略模式，可切换为正则解析方式或抽象语法树解析方式
 */
export abstract class MemberParser {
    public abstract parseMemberInfo(sourceFile: SourceFile, memberName: string, lineNumber: number): MemberInfo
}