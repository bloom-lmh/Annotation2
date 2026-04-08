import { existsSync, readFileSync } from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { createDefaultAnnotationSettings } from './annotationSettingsDefaults';
import {
  AnnotationBehaviorSettings,
  AnnotationGlobalSettings,
  AnnotationSettings,
  ClassTagSettings,
  DeepPartial,
  EnumTagSettings,
  InterfaceTagSettings,
  MethodTagSettings,
  PlainObject,
  PropertyTagSettings,
  TypedefTagSettings,
} from './annotationSettingsTypes';

export function loadAnnotationSettings(
  projectPath: string,
  document?: vscode.TextDocument,
): AnnotationSettings {
  const projectSettings = loadProjectAnnotationSettings(projectPath);
  const workspaceSettings = loadWorkspaceAnnotationSettings(document);
  return mergeObjects(createDefaultAnnotationSettings(), projectSettings, workspaceSettings);
}

function loadWorkspaceAnnotationSettings(document?: vscode.TextDocument): DeepPartial<AnnotationSettings> {
  const configuration = vscode.workspace.getConfiguration('annotation', document?.uri);

  return {
    behavior: normalizeBehaviorSettings(configuration.get('behavior')),
    global: (configuration.get('global') as AnnotationGlobalSettings | undefined) || {},
    class: { tags: (configuration.get('class.tags') as ClassTagSettings | undefined) || {} },
    method: { tags: (configuration.get('method.tags') as MethodTagSettings | undefined) || {} },
    property: { tags: (configuration.get('property.tags') as PropertyTagSettings | undefined) || {} },
    interface: {
      tags: (configuration.get('interface.tags') as InterfaceTagSettings | undefined) || {},
    },
    enum: { tags: (configuration.get('enum.tags') as EnumTagSettings | undefined) || {} },
    typedef: { tags: (configuration.get('typedef.tags') as TypedefTagSettings | undefined) || {} },
  };
}

function loadProjectAnnotationSettings(projectPath: string): DeepPartial<AnnotationSettings> {
  const configFile = [
    path.join(projectPath, 'annotation.config.json'),
    path.join(projectPath, '.annotationrc.json'),
    path.join(projectPath, '.vscode', 'annotation.json'),
  ].find(candidate => existsSync(candidate));

  if (!configFile) {
    return {};
  }

  const parsed = JSON.parse(readFileSync(configFile, 'utf-8')) as DeepPartial<AnnotationSettings>;
  if (!isObject(parsed)) {
    return {};
  }

  return {
    ...parsed,
    behavior: normalizeBehaviorSettings((parsed as PlainObject).behavior),
  };
}

function mergeObjects<T>(...values: DeepPartial<T>[]): T {
  return values.reduce<T>((result, value) => mergeTwoObjects(result, value), {} as T);
}

function mergeTwoObjects<T>(base: DeepPartial<T>, override: DeepPartial<T>): T {
  const result: PlainObject = { ...(base as PlainObject) };

  for (const [key, value] of Object.entries(override as PlainObject)) {
    const currentValue = result[key];
    if (isObject(currentValue) && isObject(value)) {
      result[key] = mergeTwoObjects(currentValue, value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }

  return result as T;
}

function isObject(value: unknown): value is PlainObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function normalizeBehaviorSettings(value: unknown): DeepPartial<AnnotationBehaviorSettings> {
  if (!isObject(value)) {
    return {};
  }

  const mode = value.mode;
  if (mode === 'insert' || mode === 'replace' || mode === 'skip') {
    return { mode };
  }

  return {};
}
