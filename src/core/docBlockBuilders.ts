import { AnnotationSettings } from './annotationSettings';
import {
  DocClassTarget,
  DocEnumTarget,
  DocInterfaceTarget,
  DocMethodTarget,
  DocPropertyTarget,
  DocTarget,
  DocTypedefTarget,
} from './docTarget';
import {
  appendAccess,
  appendFlag,
  appendList,
  appendMethodKind,
  appendName,
  appendParams,
  appendReturns,
  appendShared,
  appendTemplates,
  appendThrows,
  appendType,
  appendValue,
} from './docBuilderTags';

export function appendTargetBlock(lines: string[], target: DocTarget, settings: AnnotationSettings) {
  switch (target.kind) {
    case 'class':
      appendClassBlock(lines, target, settings);
      return;
    case 'method':
      appendMethodBlock(lines, target, settings);
      return;
    case 'property':
      appendPropertyBlock(lines, target, settings);
      return;
    case 'interface':
      appendInterfaceBlock(lines, target, settings);
      return;
    case 'enum':
      appendEnumBlock(lines, target, settings);
      return;
    case 'typedef':
      appendTypedefBlock(lines, target, settings);
      return;
  }
}

function appendClassBlock(
  lines: string[],
  target: DocClassTarget,
  settings: AnnotationSettings,
) {
  appendName(lines, settings.class.tags.nameTag, target.name);
  appendFlag(lines, settings.class.tags.classTag, '@class');
  appendFlag(lines, settings.class.tags.abstractTag && !!target.abstract, '@abstract');
  appendList(lines, settings.class.tags.extendsTag, '@extends', target.extends);
  appendList(lines, settings.class.tags.implementsTag, '@implements', target.implements, true);
  appendTemplates(lines, settings.class.tags.templateTag, target.templates);
  appendShared(lines, settings.class.tags, settings.global);
}

function appendMethodBlock(
  lines: string[],
  target: DocMethodTarget,
  settings: AnnotationSettings,
) {
  appendName(lines, settings.method.tags.nameTag, target.name);
  appendMethodKind(lines, target, settings);
  appendFlag(lines, settings.method.tags.asyncTag && !!target.async, '@async');
  appendParams(lines, settings.method.tags.paramsTag, target.params);
  appendReturns(lines, settings.method.tags.returnsTag, target.returnType, target.methodKind);
  appendFlag(lines, settings.method.tags.staticTag && !!target.static, '@static');
  appendAccess(lines, settings.method.tags.accessTag, target.access);
  appendThrows(lines, settings.method.tags.throwsTag, target.throws);
  appendTemplates(lines, settings.method.tags.templateTag, target.templates);
  appendShared(lines, settings.method.tags, settings.global);
}

function appendPropertyBlock(
  lines: string[],
  target: DocPropertyTarget,
  settings: AnnotationSettings,
) {
  appendFlag(lines, settings.property.tags.propertyTag, '@property');
  appendFlag(lines, settings.property.tags.staticTag && !!target.static, '@static');
  appendType(lines, settings.property.tags.typeTag, target.typeText);
  appendValue(lines, settings.property.tags.defaultTag, '@default', target.defaultValue);
  appendName(lines, settings.property.tags.nameTag, target.name);
  appendShared(lines, settings.property.tags, settings.global);
}

function appendInterfaceBlock(
  lines: string[],
  target: DocInterfaceTarget,
  settings: AnnotationSettings,
) {
  appendFlag(lines, settings.interface.tags.interfaceTag, '@interface');
  appendList(lines, settings.interface.tags.extendsTag, '@extends', target.extends);
  appendName(lines, settings.interface.tags.nameTag, target.name);
  appendTemplates(lines, settings.interface.tags.templateTag, target.templates);
  appendShared(lines, settings.interface.tags, settings.global);
}

function appendEnumBlock(
  lines: string[],
  target: DocEnumTarget,
  settings: AnnotationSettings,
) {
  appendName(lines, settings.enum.tags.nameTag, target.name);
  appendFlag(lines, settings.enum.tags.enumTag, '@enum');
  appendShared(lines, settings.enum.tags, settings.global);
}

function appendTypedefBlock(
  lines: string[],
  target: DocTypedefTarget,
  settings: AnnotationSettings,
) {
  appendName(lines, settings.typedef.tags.nameTag, target.name);
  appendValue(lines, settings.typedef.tags.typedefTag, '@typedef', target.typeText);
  appendType(lines, settings.typedef.tags.typeTag, target.typeText);
  appendTemplates(lines, settings.typedef.tags.templateTag, target.templates);
  appendShared(lines, settings.typedef.tags, settings.global);
}
