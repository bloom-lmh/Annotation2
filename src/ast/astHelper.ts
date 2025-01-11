import { ClassDeclaration, ConstructorDeclaration, EnumDeclaration, FunctionDeclaration, InstanceOf, InterfaceDeclaration, MethodDeclaration, MethodSignature, Project, PropertyDeclaration, PropertySignature, SourceFile, ts, TypeAliasDeclaration } from "ts-morph";
import * as vscode from 'vscode'
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
  | ConstructorDeclaration
  | null
  | undefined;

export interface MemberDeclarations {
  interfaces: InterfaceDeclaration[];
  classes: ClassDeclaration[];
  typeAliases: TypeAliasDeclaration[];
  enums: EnumDeclaration[];
  functions: FunctionDeclaration[];
  constructors: ConstructorDeclaration[];
  methods: (MethodDeclaration | MethodSignature)[];
  properties: (PropertyDeclaration | PropertySignature)[];
}
export class AstHelper {
  // 获取单个成员信息
  public async getOneMemberDeclaration(sourceFile: SourceFile, memberName: string, lineNumber: number) {
    // 获取接口信息
    const interfaceDeclarations = sourceFile.getInterfaces();
    // 获取类信息
    const classDeclarations = sourceFile.getClasses();
    // 获取类型别名声明
    const typeDeclarations = sourceFile.getTypeAliases();
    // 获取枚举信息
    const enumDeclarations = sourceFile.getEnums();
    // 获取方法信息
    const functionDeclarations = sourceFile.getFunctions();
    // 并行查询
    const r1 = this.findCompositeMember(interfaceDeclarations, memberName, lineNumber)
    const r2 = this.findCompositeMember(classDeclarations, memberName, lineNumber)
    const r3 = this.findAtomMember(typeDeclarations, memberName, lineNumber)
    const r4 = this.findAtomMember(enumDeclarations, memberName, lineNumber)
    const r5 = this.findAtomMember(functionDeclarations, memberName, lineNumber)
    // 当有一个为fulfilled状态直接返回
    const final = Promise.any([r1, r2, r3, r4, r5])
    return final
  }

  public getAllMemberDeclaration(sourceFile: SourceFile): MemberDeclarations {
    // 获取源文件中的各种声明
    const interfaceDeclarations = sourceFile.getInterfaces();
    const classDeclarations = sourceFile.getClasses();
    const typeDeclarations = sourceFile.getTypeAliases();
    const enumDeclarations = sourceFile.getEnums();
    const functionDeclarations = sourceFile.getFunctions();

    // 从接口中收集复合成员
    const interfaceMembers = this.collectCompositeMember<InterfaceDeclaration>(interfaceDeclarations);

    // 从类中收集复合成员
    const classMembers = this.collectCompositeMember<ClassDeclaration>(classDeclarations);

    // 合并接口和类的声明
    const allInterfaces = [...interfaceDeclarations, ...interfaceMembers.classOrInterfaceDeclarations];
    const allClasses = [...classDeclarations, ...classMembers.classOrInterfaceDeclarations];

    // 累积构造函数、方法和属性
    const allConstructors = [...classMembers.constructorDeclarations];
    const allMethods = [...interfaceMembers.methodDeclarations, ...classMembers.methodDeclarations];
    const allProperties = [...interfaceMembers.propertyDeclarations, ...classMembers.propertyDeclarations];

    // 返回所有收集到的声明
    return {
      interfaces: allInterfaces,
      classes: allClasses,
      typeAliases: typeDeclarations,
      enums: enumDeclarations,
      functions: functionDeclarations,
      constructors: allConstructors,
      methods: allMethods,
      properties: allProperties,
    };
  }

  private collectCompositeMember<T extends InterfaceDeclaration | ClassDeclaration>(memberDeclarations: T[]): {
    classOrInterfaceDeclarations: T[];
    constructorDeclarations: ConstructorDeclaration[];
    methodDeclarations: (MethodDeclaration | MethodSignature)[];
    propertyDeclarations: (PropertyDeclaration | PropertySignature)[];
  } {
    const classOrInterfaceDeclarations: T[] = [];
    const constructorDeclarations: ConstructorDeclaration[] = [];
    const methodDeclarations: (MethodDeclaration | MethodSignature)[] = [];
    const propertyDeclarations: (PropertyDeclaration | PropertySignature)[] = [];

    for (const memberDeclaration of memberDeclarations) {
      // 收集类或接口声明
      classOrInterfaceDeclarations.push(memberDeclaration);

      // 如果是类，则收集构造函数
      if (memberDeclaration instanceof ClassDeclaration) {
        constructorDeclarations.push(...memberDeclaration.getConstructors());
      }

      // 收集方法
      methodDeclarations.push(...memberDeclaration.getMethods());

      // 收集属性
      propertyDeclarations.push(...memberDeclaration.getProperties());
    }

    return {
      classOrInterfaceDeclarations,
      constructorDeclarations,
      methodDeclarations,
      propertyDeclarations,
    };
  }


  private async findCompositeMember(memberDeclarations: Array<ClassDeclaration | InterfaceDeclaration>, memberName: string, lineNumber: number): Promise<MemberDeclaration> {
    for (const member of memberDeclarations) {
      const _memberName = member.getName();
      const startLine = member.getStartLineNumber();
      const endLine = member.getEndLineNumber();

      // 1. 查找构造函数
      if (member instanceof ClassDeclaration) {

        const constructor = member.getConstructors().find(constructor => constructor.getStartLineNumber() === lineNumber);
        if (constructor && memberName === "constructor") {
          return constructor;
        }
      }

      // 2. 查找方法
      const methodDeclaration = member.getMethods().find(method => method.getName() === memberName && method.getStartLineNumber() === lineNumber);
      if (methodDeclaration) {
        return methodDeclaration;
      }

      // 3. 查找属性
      const propertyDeclaration = member.getProperties().find(property => property.getName() === memberName && property.getStartLineNumber() === lineNumber);
      if (propertyDeclaration) {
        return propertyDeclaration;
      }

      // 4. 如果是类的名称并且行号在类的范围内，则返回类本身
      if (memberName === _memberName && lineNumber >= startLine && lineNumber <= endLine) {
        return member;
      }
    }
    return Promise.reject(null)
  }

  private async findAtomMember(memberDeclarations: Array<TypeAliasDeclaration | EnumDeclaration | FunctionDeclaration>, memberName: string, lineNumber: number): Promise<MemberDeclaration> {
    const member = memberDeclarations.find(member => member.getName() === memberName && member.getStartLineNumber() === lineNumber)
    return member;
  }



  // 查询接口成员
  // 获取方法、类或属性信息
  public getOneMemberDeclarationSync(sourceFile: SourceFile, memberName: string, lineNumber: number): MemberDeclaration {
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
    const interfaceMember = this.findCompositeMemberSync(interfaces, memberName, lineNumber);
    const classMember = this.findCompositeMemberSync(classes, memberName, lineNumber);
    const typeMember = this.findAtomMemberSync(types, memberName, lineNumber);
    const enumMember = this.findAtomMemberSync(enums, memberName, lineNumber);
    const functionMember = this.findAtomMemberSync(functions, memberName, lineNumber);
    // 返回成员信息
    return classMember || interfaceMember || typeMember || enumMember || functionMember;
  }

  private findCompositeMemberSync(arr: Array<ClassDeclaration | InterfaceDeclaration>, memberName: string, lineNumber: number): MemberDeclaration {
    for (const member of arr) {
      const memberNameOfClass = member.getName();
      const classStartLine = member.getStartLineNumber();
      const classEndLine = member.getEndLineNumber();

      // 1. 查找构造函数
      if (member instanceof ClassDeclaration) {
        const constructor = member.getConstructors().find(constructor => constructor.getStartLineNumber() === lineNumber);
        if (constructor && memberName === "constructor") {
          return constructor; // 返回匹配的构造函数
        }
      }

      // 2. 查找方法
      const methodDeclaration = member.getMethods().find(method => method.getName() === memberName && method.getStartLineNumber() === lineNumber);
      if (methodDeclaration) {
        return methodDeclaration;
      }

      // 3. 查找属性
      const propertyDeclaration = member.getProperties().find(property => property.getName() === memberName && property.getStartLineNumber() === lineNumber);
      if (propertyDeclaration) {
        return propertyDeclaration;
      }

      // 4. 如果是类的名称并且行号在类的范围内，则返回类本身
      if (memberNameOfClass === memberName) {
        if (lineNumber >= classStartLine && lineNumber <= classEndLine) {
          return member;
        }
      }
    }
    return null;
  }


  private findAtomMemberSync(arr: Array<TypeAliasDeclaration | EnumDeclaration | FunctionDeclaration>, memberName: string, lineNumber: number): MemberDeclaration {
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
