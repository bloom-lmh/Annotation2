import * as assert from 'assert';
import { suite, test } from 'mocha';
import { SyntaxKind } from 'ts-morph';
import { AstParser } from '../../ast/astParser';
import { DocMethodTarget, DocPropertyTarget } from '../../core/docTarget';
import { DocTargetParser } from '../../core/docTargetParser';

const parserInput = `
interface Repo<T> {
  map<U>(callback: (item: T) => U): Result<U>;
  value: T;
}

class Service extends Base implements Repo<string> {
  constructor(private readonly seed: number) {
    if (seed < 0) {
      throw new RangeError('negative');
    }
  }

  handler = async <TInput>(input: TInput): Promise<TInput> => {
    if (!input) {
      throw new Error('missing');
    }

    return input;
  };

  readonly name: string = 'svc';
}
`;

suite('DocTargetParser', () => {
  test('parseAll classifies signatures, constructors, arrow methods, and properties', () => {
    const sourceFile = new AstParser().parseByText(parserInput, 'parser-fixture.ts');
    const targets = new DocTargetParser().parseAll(sourceFile);

    const isMethodTarget = (target: unknown): target is DocMethodTarget =>
      !!target && typeof target === 'object' && (target as DocMethodTarget).kind === 'method';
    const isPropertyTarget = (target: unknown): target is DocPropertyTarget =>
      !!target && typeof target === 'object' && (target as DocPropertyTarget).kind === 'property';

    const interfaceMethod = targets.find(
      (target): target is DocMethodTarget => isMethodTarget(target) && target.name === 'map',
    );
    assert.ok(interfaceMethod);
    assert.deepStrictEqual(interfaceMethod.params, [{ name: 'callback', type: '(item: T) => U' }]);
    assert.strictEqual(interfaceMethod.returnType, 'Result<U>');
    assert.deepStrictEqual(interfaceMethod.templates, ['U']);

    const interfaceProperty = targets.find(
      (target): target is DocPropertyTarget => isPropertyTarget(target) && target.name === 'value',
    );
    assert.ok(interfaceProperty);
    assert.strictEqual(interfaceProperty.typeText, 'T');

    const constructorTarget = targets.find(
      (target): target is DocMethodTarget =>
        isMethodTarget(target) && target.methodKind === 'constructor',
    );
    assert.ok(constructorTarget);
    assert.deepStrictEqual(constructorTarget.throws, ['RangeError']);
    assert.strictEqual(constructorTarget.returnType, '');

    const arrowMethod = targets.find(
      (target): target is DocMethodTarget => isMethodTarget(target) && target.name === 'handler',
    );
    assert.ok(arrowMethod);
    assert.strictEqual(arrowMethod.async, true);
    assert.strictEqual(arrowMethod.static, false);
    assert.deepStrictEqual(arrowMethod.templates, ['TInput']);
    assert.deepStrictEqual(arrowMethod.throws, ['Error']);
    assert.strictEqual(arrowMethod.returnType, 'Promise<TInput>');

    const classProperty = targets.find(
      (target): target is DocPropertyTarget => isPropertyTarget(target) && target.name === 'name',
    );
    assert.ok(classProperty);
    assert.strictEqual(classProperty.typeText, 'string');
    assert.strictEqual(classProperty.defaultValue, "'svc'");
  });

  test('parseAtLine prefers the innermost declaration on the selected line', () => {
    const sourceFile = new AstParser().parseByText(parserInput, 'parser-fixture.ts');
    const handlerThrowLine = sourceFile
      .getDescendantsOfKind(SyntaxKind.ThrowStatement)
      .find(statement => statement.getText().includes("Error('missing')"))
      ?.getStartLineNumber();

    assert.ok(handlerThrowLine, 'Expected to find the throw statement inside the handler.');

    const target = new DocTargetParser().parseAtLine(sourceFile, handlerThrowLine!);
    assert.ok(target);
    assert.strictEqual(target.kind, 'method');
    assert.strictEqual(target.name, 'handler');
  });
});
