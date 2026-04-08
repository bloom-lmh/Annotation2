import { Node } from 'ts-morph';

export type DocTargetKind = 'class' | 'method' | 'property' | 'interface' | 'enum' | 'typedef';
export type DocAccess = 'public' | 'private' | 'protected';
export type DocMethodKind = 'method' | 'function' | 'constructor';

export interface DocParam {
  name: string;
  type: string;
}

interface DocTargetBase {
  declaration: Node;
  name: string;
  line: number;
  endLine: number;
}

export interface DocClassTarget extends DocTargetBase {
  kind: 'class';
  abstract: boolean;
  extends: string[];
  implements: string[];
  templates: string[];
}

export interface DocMethodTarget extends DocTargetBase {
  kind: 'method';
  access: DocAccess;
  static: boolean;
  async: boolean;
  methodKind: DocMethodKind;
  params: DocParam[];
  returnType: string;
  throws: string[];
  templates: string[];
}

export interface DocPropertyTarget extends DocTargetBase {
  kind: 'property';
  access: DocAccess;
  static: boolean;
  typeText: string;
  defaultValue: string;
}

export interface DocInterfaceTarget extends DocTargetBase {
  kind: 'interface';
  extends: string[];
  templates: string[];
}

export interface DocEnumTarget extends DocTargetBase {
  kind: 'enum';
}

export interface DocTypedefTarget extends DocTargetBase {
  kind: 'typedef';
  typeText: string;
  templates: string[];
}

export type DocTarget =
  | DocClassTarget
  | DocMethodTarget
  | DocPropertyTarget
  | DocInterfaceTarget
  | DocEnumTarget
  | DocTypedefTarget;
