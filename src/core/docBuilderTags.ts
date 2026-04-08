import { AnnotationSettings } from './annotationSettings';
import { DocMethodKind, DocMethodTarget, DocParam } from './docTarget';

export type SharedTagSettings = {
  authorTag?: boolean;
  aliasTag?: boolean;
  versionTag?: boolean;
  descriptionTag?: boolean;
  seeTag?: boolean;
  exampleTag?: boolean;
};

export function appendShared(
  lines: string[],
  tagSettings: SharedTagSettings,
  globalSettings: AnnotationSettings['global'],
) {
  appendValue(lines, !!tagSettings.authorTag, '@author', globalSettings.authorInfo);
  appendFlag(lines, !!tagSettings.aliasTag, '@alias');
  appendValue(lines, !!tagSettings.versionTag, '@version', globalSettings.versionInfo);
  appendFlag(lines, !!tagSettings.descriptionTag, '@description');
  appendFlag(lines, !!tagSettings.seeTag, '@see');
  appendFlag(lines, !!tagSettings.exampleTag, '@example');
}

export function appendMethodKind(
  lines: string[],
  target: DocMethodTarget,
  settings: AnnotationSettings,
) {
  if (target.methodKind === 'constructor') {
    appendFlag(lines, settings.method.tags.constructorTag, '@constructor');
    return;
  }
  if (target.methodKind === 'function') {
    appendFlag(lines, settings.method.tags.functionTag, '@function');
    return;
  }
  appendFlag(lines, true, '@method');
}

export function appendParams(lines: string[], enabled: boolean, params?: DocParam[]) {
  if (!enabled || !params?.length) {
    return;
  }
  params.forEach(param => {
    lines.push(` * @param {${param.type || 'any'}} ${param.name}`);
  });
}

export function appendReturns(
  lines: string[],
  enabled: boolean,
  returnType?: string,
  methodKind?: DocMethodKind,
) {
  if (!enabled || !returnType || !returnType.trim() || returnType === 'void' || methodKind === 'constructor') {
    return;
  }
  lines.push(` * @returns {${returnType}}`);
}

export function appendThrows(lines: string[], enabled: boolean, throwsValues?: string[]) {
  if (!enabled || !throwsValues?.length) {
    return;
  }
  throwsValues.forEach(value => {
    lines.push(` * @throws {${value}}`);
  });
}

export function appendTemplates(lines: string[], enabled: boolean, templates?: string[]) {
  if (!enabled || !templates?.length) {
    return;
  }
  templates.forEach(template => {
    lines.push(` * @template ${template}`);
  });
}

export function appendList(
  lines: string[],
  enabled: boolean,
  tag: string,
  values?: string[],
  wrapInBraces = false,
) {
  if (!enabled || !values?.length) {
    return;
  }
  values.filter(Boolean).forEach(value => {
    lines.push(` * ${tag} ${wrapInBraces ? `{${value}}` : value}`);
  });
}

export function appendFlag(lines: string[], enabled: boolean, tag: string) {
  if (enabled) {
    lines.push(` * ${tag}`);
  }
}

export function appendValue(lines: string[], enabled: boolean, tag: string, value?: string) {
  if (enabled && value) {
    lines.push(` * ${tag} ${value}`);
  }
}

export function appendName(lines: string[], enabled: boolean, name: string) {
  appendValue(lines, enabled, '@name', name);
}

export function appendType(lines: string[], enabled: boolean, type?: string) {
  if (enabled && type) {
    lines.push(` * @type {${type}}`);
  }
}

export function appendAccess(lines: string[], enabled: boolean, access?: string) {
  if (enabled && access) {
    lines.push(` * @access ${access}`);
  }
}
