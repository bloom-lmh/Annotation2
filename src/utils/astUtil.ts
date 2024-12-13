import { ClassDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, MethodSignature, PropertyDeclaration, PropertySignature, SourceFile } from "ts-morph";
export type MemberDeclaration =
    | ClassDeclaration
    | FunctionDeclaration
    | PropertyDeclaration
    | PropertySignature
    | InterfaceDeclaration
    | MethodSignature // 包含 MethodSignature
    | MethodDeclaration // 包含 MethodDeclaration
    | null;

export class AstUtil {

    // 获取方法、类或属性信息
    public getMemberInfo(sourceFile: SourceFile, memberName: string, lineNumber: number): MemberDeclaration {
        // 获取接口信息
        const interfaces = sourceFile.getInterfaces();
        // 获取类信息
        const classes = sourceFile.getClasses();

        // 遍历接口和类
        const interfaceMember = this.memberVisit(interfaces, memberName, lineNumber);
        const classMember = this.memberVisit(classes, memberName, lineNumber);
        // 返回成员信息
        return classMember || interfaceMember;
    }

    private memberVisit(arr: Array<ClassDeclaration | InterfaceDeclaration>, memberName: string, lineNumber: number): MemberDeclaration {
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
}
