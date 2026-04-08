import {
  ClassDeclaration,
  ConstructorDeclaration,
  EnumDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  MethodDeclaration,
  MethodSignature,
  PropertyDeclaration,
  PropertySignature,
  SourceFile,
  TypeAliasDeclaration,
} from 'ts-morph';

export type SupportedDeclaration =
  | ClassDeclaration
  | ConstructorDeclaration
  | EnumDeclaration
  | FunctionDeclaration
  | InterfaceDeclaration
  | MethodDeclaration
  | MethodSignature
  | PropertyDeclaration
  | PropertySignature
  | TypeAliasDeclaration;

export function collectSupportedDeclarations(sourceFile: SourceFile): SupportedDeclaration[] {
  const declarations: SupportedDeclaration[] = [
    ...sourceFile.getInterfaces(),
    ...sourceFile.getClasses(),
    ...sourceFile.getTypeAliases(),
    ...sourceFile.getEnums(),
    ...sourceFile.getFunctions(),
  ];

  sourceFile.getInterfaces().forEach(declaration => {
    declarations.push(...declaration.getMethods(), ...declaration.getProperties());
  });

  sourceFile.getClasses().forEach(declaration => {
    declarations.push(
      ...declaration.getConstructors(),
      ...declaration.getMethods(),
      ...declaration.getProperties(),
    );
  });

  return declarations;
}
