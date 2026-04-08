import { AnnotationSettings } from './annotationSettings';
import { appendTargetBlock } from './docBlockBuilders';
import { DocTarget } from './docTarget';

export function buildDocBlock(target: DocTarget, settings: AnnotationSettings): string {
  const lines = ['/**'];
  appendTargetBlock(lines, target, settings);
  lines.push(' */');
  return lines.join('\n');
}
