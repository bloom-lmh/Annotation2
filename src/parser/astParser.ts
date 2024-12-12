import { SourceFile } from "ts-morph";
import { MemberParser } from "./memberParser";

export class AstParser extends MemberParser {
    static getMemberInfoByName(sourceFile: SourceFile, wordText: string, lineNumber: number) {
        throw new Error('Method not implemented.');
    }
    // 获取方法,类或属性信息
    public async parseMemberInfo(sourceFile: SourceFile, memberName: string, lineNumber: number) {
        const classDetails = await Promise.all(
            sourceFile.getClasses().map(async cls => {
                const className = cls.getName();

                // 并行处理属性和方法
                const [methods, properties] = await Promise.all([
                    Promise.all(
                        cls.getMethods().map(async method => ({
                            name: method.getName(),
                            parameters: method.getParameters().map(param => ({
                                name: param.getName(),
                                type: param.getType().getText(),
                            })),
                            returnType: method.getReturnType().getText(),
                        }))
                    ),
                    Promise.all(
                        cls.getProperties().map(async prop => ({
                            name: prop.getName(),
                            type: prop.getType().getText(),
                            isReadonly: prop.isReadonly(),
                        }))
                    ),
                ]);

                return { className, methods, properties };
            })
        );
        return classDetails
    }
}