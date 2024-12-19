import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, MethodSignature, PropertyDeclaration, PropertySignature, SourceFile, ts, TypeAliasDeclaration } from "ts-morph";
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

export class AstUtil {


    // 获取方法、类或属性信息
    public getMemberInfo(sourceFile: SourceFile, memberName: string, lineNumber: number): MemberDeclaration {
        // 获取接口信息
        const interfaces = sourceFile.getInterfaces();
        // 获取类信息
        const classes = sourceFile.getClasses();
        // 获取类型别名声明
        const types = sourceFile.getTypeAliases()
        // 获取枚举信息
        const enums = sourceFile.getEnums()
        // 获取方法信息
        const functions = sourceFile.getFunctions()

        // 获取具体成员信息
        const interfaceMember = this.unionMemberVisit(interfaces, memberName, lineNumber);
        const classMember = this.unionMemberVisit(classes, memberName, lineNumber);
        const typeMember = this.singleMemberVisit(types, memberName, lineNumber)
        const enumMember = this.singleMemberVisit(enums, memberName, lineNumber)
        const functionMember = this.singleMemberVisit(functions, memberName, lineNumber)
        // 返回成员信息
        return classMember || interfaceMember || typeMember || enumMember || functionMember;
    }

    private unionMemberVisit(arr: Array<ClassDeclaration | InterfaceDeclaration>, memberName: string, lineNumber: number): MemberDeclaration {
        // 遍历每个类或接口
        for (const member of arr) {
            // 检查是否是类名或接口名本身
            if (member.getName() === memberName) {
                return member; // 如果是成员本身
            }

            // 查找方法 
            const methodDeclaration = member.getMethods().find(method => method.getName() === memberName);
            if (methodDeclaration) {
                return methodDeclaration; // 返回找到的第一个匹配方法
            }

            // 查找属性
            const propertyDeclaration = member.getProperties().find(property => property.getName() === memberName);

            if (propertyDeclaration) {
                return propertyDeclaration; // 返回找到的第一个匹配属性
            }
        }

        return null; // 如果没有找到成员，返回 null
    }

    private singleMemberVisit(arr: Array<TypeAliasDeclaration | EnumDeclaration | FunctionDeclaration>, memberName: string, lineNumber: number): MemberDeclaration {
        // 遍历每个类或接口
        for (const member of arr) {
            // 检查是否是类名或接口名本身
            if (member.getName() === memberName) {
                return member; // 如果是成员本身
            }
        }
        return null; // 如果没有找到成员，返回 null
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
}
