import * as assert from 'assert';
import { suite, test } from 'mocha';
import { AstParser } from '../../ast/astParser';
import { createDefaultAnnotationSettings } from '../../core/annotationSettings';
import { buildDocBlock } from '../../core/docBuilder';
import { DocClassTarget, DocMethodTarget, DocPropertyTarget } from '../../core/docTarget';

function createDeclaration() {
  return new AstParser()
    .parseByText('function placeholder() {}', 'builder-fixture.ts')
    .getFunctionOrThrow('placeholder');
}

suite('DocBuilder', () => {
  test('builds a rich method docblock with params, returns, throws, and templates', () => {
    const settings = createDefaultAnnotationSettings();
    const target: DocMethodTarget = {
      kind: 'method',
      declaration: createDeclaration(),
      name: 'load',
      line: 0,
      endLine: 0,
      access: 'protected',
      static: true,
      async: true,
      methodKind: 'method',
      params: [{ name: 'source', type: 'string' }],
      returnType: 'Promise<Result<T>>',
      throws: ['Error'],
      templates: ['T'],
    };

    const block = buildDocBlock(target, settings);

    assert.ok(block.includes('@name load'));
    assert.ok(block.includes('@method'));
    assert.ok(block.includes('@async'));
    assert.ok(block.includes('@param {string} source'));
    assert.ok(block.includes('@returns {Promise<Result<T>>}'));
    assert.ok(block.includes('@static'));
    assert.ok(block.includes('@access protected'));
    assert.ok(block.includes('@throws {Error}'));
    assert.ok(block.includes('@template T'));
  });

  test('omits returns for constructors even when a return type is present', () => {
    const settings = createDefaultAnnotationSettings();
    const target: DocMethodTarget = {
      kind: 'method',
      declaration: createDeclaration(),
      name: 'constructor',
      line: 0,
      endLine: 0,
      access: 'public',
      static: false,
      async: false,
      methodKind: 'constructor',
      params: [{ name: 'seed', type: 'number' }],
      returnType: 'Example',
      throws: ['RangeError'],
      templates: [],
    };

    const block = buildDocBlock(target, settings);

    assert.ok(block.includes('@constructor'));
    assert.ok(block.includes('@param {number} seed'));
    assert.ok(block.includes('@throws {RangeError}'));
    assert.ok(!block.includes('@returns'));
  });

  test('builds class and property blocks from the same default settings model', () => {
    const settings = createDefaultAnnotationSettings();
    settings.global.authorInfo = 'team-docs';
    settings.class.tags.authorTag = true;

    const declaration = createDeclaration();
    const classTarget: DocClassTarget = {
      kind: 'class',
      declaration,
      name: 'Repository',
      line: 0,
      endLine: 0,
      abstract: true,
      extends: ['BaseRepository<T>'],
      implements: ['Disposable', 'Cacheable<T>'],
      templates: ['T'],
    };
    const propertyTarget: DocPropertyTarget = {
      kind: 'property',
      declaration,
      name: 'count',
      line: 0,
      endLine: 0,
      access: 'public',
      static: true,
      typeText: 'number',
      defaultValue: '0',
    };

    const classBlock = buildDocBlock(classTarget, settings);
    const propertyBlock = buildDocBlock(propertyTarget, settings);

    assert.ok(classBlock.includes('@class'));
    assert.ok(classBlock.includes('@abstract'));
    assert.ok(classBlock.includes('@extends BaseRepository<T>'));
    assert.ok(classBlock.includes('@implements {Disposable}'));
    assert.ok(classBlock.includes('@implements {Cacheable<T>}'));
    assert.ok(classBlock.includes('@template T'));
    assert.ok(classBlock.includes('@author team-docs'));

    assert.ok(propertyBlock.includes('@property'));
    assert.ok(propertyBlock.includes('@static'));
    assert.ok(propertyBlock.includes('@type {number}'));
    assert.ok(propertyBlock.includes('@default 0'));
    assert.ok(propertyBlock.includes('@name count'));
  });
});
