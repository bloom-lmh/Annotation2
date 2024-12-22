import { MemberDeclaration } from "../utils/astUtil";
import { MemberType } from "./member";
import { AstParseStrategy, MemberParseStrategy } from "./memberParseStrategy";

/**
 * 成员解析器
 */
export class MemberParser {
    /**
     * 解析策略
     */
    private memberParseStrategy: MemberParseStrategy


    constructor(memberParseStrategy: MemberParseStrategy) {
        this.memberParseStrategy = memberParseStrategy
    }


    public parseMember(): MemberType | null {
        return this.memberParseStrategy.parseMember()
    }
}