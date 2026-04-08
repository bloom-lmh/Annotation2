import * as assert from 'assert';
import { suite, test } from 'mocha';
import { AstParser } from '../../ast/astParser';

suite('AstParser', () => {
  test('parseByText refreshes the cached source file when the same path is reused', () => {
    const parser = new AstParser();

    const first = parser.parseByText('const value = 1;', 'cached-file.ts');
    const second = parser.parseByText('const value = 2;', 'cached-file.ts');

    assert.strictEqual(first, second);
    assert.ok(second.getFullText().includes('const value = 2;'));
    assert.ok(!second.getFullText().includes('const value = 1;'));
  });
});
