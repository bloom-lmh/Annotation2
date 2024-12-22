import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, MethodSignature, Project, PropertyDeclaration, PropertySignature, SourceFile, ts, TypeAliasDeclaration } from "ts-morph";
import * as vscode from 'vscode'

export class AstHelper {
    // 获取全部的成员信息


    // 获取方法、类或属性信息
    public getMemberInfo(sourceFile: SourceFile, memberName: string, lineNumber: number): MemberDeclaration {
        // 获取接口信息
        const interfaces = sourceFile.getInterfaces();
        // 获取类信息
        const classes = sourceFile.getClasses();
        // 获取类型别名声明
        const types = sourceFile.getTypeAliases();
        // 获取枚举信息
        const enums = sourceFile.getEnums();
        // 获取方法信息
        const functions = sourceFile.getFunctions();

        // 获取具体成员信息
        const interfaceMember = this.unionMemberVisit(interfaces, memberName, lineNumber);
        const classMember = this.unionMemberVisit(classes, memberName, lineNumber);
        const typeMember = this.singleMemberVisit(types, memberName, lineNumber);
        const enumMember = this.singleMemberVisit(enums, memberName, lineNumber);
        const functionMember = this.singleMemberVisit(functions, memberName, lineNumber);
        // 返回成员信息
        return classMember || interfaceMember || typeMember || enumMember || functionMember;
    }


    // 处理类和接口，查找成员
    private unionMemberVisit(arr: Array<ClassDeclaration | InterfaceDeclaration>, memberName: string, lineNumber: number): MemberDeclaration {
        for (const member of arr) {
            const memberNameOfClass = member.getName();
            const classStartLine = member.getStartLineNumber();
            const classEndLine = member.getEndLineNumber();

            const methodDeclaration = member.getMethods().find(method => method.getName() === memberName && method.getStartLineNumber() === lineNumber);
            if (methodDeclaration) {
                return methodDeclaration;
            }

            const propertyDeclaration = member.getProperties().find(property => property.getName() === memberName && property.getStartLineNumber() === lineNumber);
            if (propertyDeclaration) {
                return propertyDeclaration;
            }

            if (memberNameOfClass === memberName) {
                if (lineNumber >= classStartLine && lineNumber <= classEndLine) {
                    return member;
                }
            }
        }
        return null;
    }

    private singleMemberVisit(arr: Array<TypeAliasDeclaration | EnumDeclaration | FunctionDeclaration>, memberName: string, lineNumber: number): MemberDeclaration {
        for (const member of arr) {
            if (member.getName() === memberName && member.getStartLineNumber() === lineNumber) {
                return member;
            }
        }
        return null;
    }


    public static getMethodThrows(methodDeclaration: MethodDeclaration | FunctionDeclaration): Set<string> {
        let throwRegExp = /\bthrow\s+new\s+(?<errorType>\w+)\s*\(\s*.*?\s*\)\s*;?/
        const throws: Set<string> = new Set()
        // 方法声明
        const methodBody = methodDeclaration.getBody();
        if (methodBody) {
            const throwStatements = methodBody.getDescendantsOfKind(ts.SyntaxKind.ThrowStatement);
            throwStatements.forEach(statement => {
                let res = statement.getText().match(throwRegExp)
                if (res) {
                    throws.add(res[1])
                }
            })
        }
        return throws
    }

    public static getModefier(memberDeclaration: MethodDeclaration | FunctionDeclaration | PropertyDeclaration): string {
        return memberDeclaration.getModifiers().find(modifier => modifier.getText() && modifier.getText() !== "static")?.getText() || ""
    }

    public static getType(memberDeclaration: TypeAliasDeclaration): string {
        // 获取类型名
        let typeName = ""
        // 获取类型
        const _type = memberDeclaration.getType()
        // 获取类型名
        if (_type.isUnion()) {
            const typeArr = _type.getUnionTypes().map((unionType) => {
                return unionType.getText()
            });
            typeName = typeArr.join("|")
        } else {
            typeName = _type.getText()
        }
        return typeName
    }

}
export type MemberDeclaration =
    | ClassDeclaration
    | FunctionDeclaration
    | PropertyDeclaration
    | PropertySignature
    | TypeAliasDeclaration
    | InterfaceDeclaration
    | MethodSignature // 包含 MethodSignature
    | MethodDeclaration // 包含 MethodDeclaration
    | EnumDeclaration
    | null;