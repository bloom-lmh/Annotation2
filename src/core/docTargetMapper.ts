import {
  ClassDeclaration,
  ConstructorDeclaration,
  EnumDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  MethodDeclaration,
  MethodSignature,
  Node,
  ParameterDeclaration,
  PropertyDeclaration,
  PropertySignature,
  SyntaxKind,
  TypeAliasDeclaration,
} from 'ts-morph';
import { DocAccess, DocMethodKind, DocParam, DocTarget } from './docTarget';
import { SupportedDeclaration } from './docTargetDeclarations';

export function mapDeclarationToDocTarget(declaration: SupportedDeclaration): DocTarget | null {
  if (declaration instanceof ClassDeclaration) {
    return {
      kind: 'class',
      declaration,
      name: declaration.getName() || 'UnnamedClass',
      line: declaration.getStartLineNumber() - 1,
      endLine: declaration.getEndLineNumber() - 1,
      abstract: declaration.isAbstract(),
      extends: declaration.getExtends() ? [declaration.getExtends()!.getText()] : [],
      implements: declaration.getImplements().map(item => item.getText()),
      templates: declaration.getTypeParameters().map(item => item.getName()),
    };
  }

  if (declaration instanceof InterfaceDeclaration) {
    return {
      kind: 'interface',
      declaration,
      name: declaration.getName(),
      line: declaration.getStartLineNumber() - 1,
      endLine: declaration.getEndLineNumber() - 1,
      extends: declaration.getExtends().map(item => item.getText()),
      templates: declaration.getTypeParameters().map(item => item.getName()),
    };
  }

  if (declaration instanceof EnumDeclaration) {
    return {
      kind: 'enum',
      declaration,
      name: declaration.getName(),
      line: declaration.getStartLineNumber() - 1,
      endLine: declaration.getEndLineNumber() - 1,
    };
  }

  if (declaration instanceof TypeAliasDeclaration) {
    return {
      kind: 'typedef',
      declaration,
      name: declaration.getName(),
      line: declaration.getStartLineNumber() - 1,
      endLine: declaration.getEndLineNumber() - 1,
      typeText: declaration.getTypeNode()?.getText() || declaration.getType().getText(),
      templates: declaration.getTypeParameters().map(item => item.getName()),
    };
  }

  if (isCallableDeclaration(declaration)) {
    return {
      kind: 'method',
      declaration,
      name:
        declaration instanceof ConstructorDeclaration
          ? 'constructor'
          : declaration.getName() || 'UnnamedMethod',
      line: declaration.getStartLineNumber() - 1,
      endLine: declaration.getEndLineNumber() - 1,
      access: getAccess(declaration),
      static: declaration instanceof MethodDeclaration ? declaration.isStatic() : false,
      async:
        declaration instanceof MethodDeclaration || declaration instanceof FunctionDeclaration
          ? declaration.isAsync()
          : false,
      methodKind: getMethodKind(declaration),
      params: declaration.getParameters().map(parameterToParam),
      returnType:
        declaration instanceof ConstructorDeclaration
          ? ''
          : declaration.getReturnTypeNode()?.getText() || declaration.getReturnType().getText(),
      throws: [...getThrowsFromNode(getCallableBody(declaration))],
      templates:
        'getTypeParameters' in declaration
          ? declaration.getTypeParameters().map(item => item.getName())
          : [],
    };
  }

  if (declaration instanceof PropertyDeclaration || declaration instanceof PropertySignature) {
    const callablePropertyTarget = mapCallablePropertyToDocTarget(declaration);
    if (callablePropertyTarget) {
      return callablePropertyTarget;
    }

    return {
      kind: 'property',
      declaration,
      name: declaration.getName(),
      line: declaration.getStartLineNumber() - 1,
      endLine: declaration.getEndLineNumber() - 1,
      access: getAccess(declaration),
      static: declaration instanceof PropertyDeclaration ? declaration.isStatic() : false,
      typeText: declaration.getTypeNode()?.getText() || declaration.getType().getText(),
      defaultValue:
        declaration instanceof PropertyDeclaration ? declaration.getInitializer()?.getText() || '' : '',
    };
  }

  return null;
}

function mapCallablePropertyToDocTarget(
  declaration: PropertyDeclaration | PropertySignature,
): DocTarget | null {
  if (!(declaration instanceof PropertyDeclaration)) {
    return null;
  }

  const initializer = declaration.getInitializer();
  if (!initializer || (!Node.isArrowFunction(initializer) && !Node.isFunctionExpression(initializer))) {
    return null;
  }

  return {
    kind: 'method',
    declaration,
    name: declaration.getName(),
    line: declaration.getStartLineNumber() - 1,
    endLine: declaration.getEndLineNumber() - 1,
    access: getAccess(declaration),
    static: declaration.isStatic(),
    async: initializer.isAsync(),
    methodKind: 'method',
    params: initializer.getParameters().map(parameterToParam),
    returnType: declaration.getTypeNode()?.getText() || initializer.getReturnType().getText(),
    throws: [...getThrowsFromNode(initializer.getBody())],
    templates: initializer.getTypeParameters().map(item => item.getName()),
  };
}

function isCallableDeclaration(
  declaration: SupportedDeclaration,
): declaration is MethodDeclaration | FunctionDeclaration | ConstructorDeclaration | MethodSignature {
  return (
    declaration instanceof MethodDeclaration ||
    declaration instanceof FunctionDeclaration ||
    declaration instanceof ConstructorDeclaration ||
    declaration instanceof MethodSignature
  );
}

function getCallableBody(
  declaration:
    | MethodDeclaration
    | FunctionDeclaration
    | ConstructorDeclaration
    | MethodSignature,
) {
  if ('getBody' in declaration) {
    return declaration.getBody();
  }
  return undefined;
}

function getMethodKind(
  declaration:
    | MethodDeclaration
    | FunctionDeclaration
    | ConstructorDeclaration
    | MethodSignature,
): DocMethodKind {
  if (declaration instanceof ConstructorDeclaration) {
    return 'constructor';
  }
  if (declaration instanceof FunctionDeclaration) {
    return 'function';
  }
  return 'method';
}

function parameterToParam(parameter: ParameterDeclaration): DocParam {
  return {
    name: parameter.getName(),
    type: parameter.getTypeNode()?.getText() || parameter.getType().getText(),
  };
}

function getAccess(
  declaration:
    | MethodDeclaration
    | ConstructorDeclaration
    | PropertyDeclaration
    | PropertySignature
    | MethodSignature
    | FunctionDeclaration,
): DocAccess {
  if ('hasModifier' in declaration) {
    if (declaration.hasModifier('private')) {
      return 'private';
    }
    if (declaration.hasModifier('protected')) {
      return 'protected';
    }
  }
  return 'public';
}

function getThrowsFromNode(node: Node | undefined): Set<string> {
  const throws = new Set<string>();

  if (!node) {
    return throws;
  }

  node.getDescendantsOfKind(SyntaxKind.ThrowStatement).forEach(statement => {
    const match = statement.getText().match(/\bthrow\s+new\s+(\w+)\s*\(/);
    if (match?.[1]) {
      throws.add(match[1]);
    }
  });

  return throws;
}
