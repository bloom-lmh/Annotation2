import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { suite, test } from 'mocha';
import { commandMessages } from '../../command/commandMessages';
import { TestWorkspace } from '../helpers/testWorkspace';

suite('Annotation Commands', () => {
  const createdFiles: string[] = [];
  let originalBehavior: unknown;
  let originalMethodTags: unknown;

  async function openFixture(relativePath: string, targetFileName: string) {
    const targetPath = await TestWorkspace.prepareFixtureCopy(relativePath, targetFileName);
    createdFiles.push(targetPath);
    return TestWorkspace.openFile(targetPath);
  }

  async function activateExtension() {
    const extension = vscode.extensions.getExtension('SWUST-WEBLAB-LMH.annotation');
    assert.ok(extension, 'Expected extension to be available.');
    await extension.activate();
  }

  async function updateAnnotationSettings(behavior?: unknown, methodTags?: unknown) {
    const configuration = vscode.workspace.getConfiguration('annotation');
    await configuration.update('behavior', behavior, vscode.ConfigurationTarget.Workspace);
    await configuration.update('method.tags', methodTags, vscode.ConfigurationTarget.Workspace);
  }

  function captureWindowMessages() {
    const infoDescriptor = Object.getOwnPropertyDescriptor(vscode.window, 'showInformationMessage');
    const errorDescriptor = Object.getOwnPropertyDescriptor(vscode.window, 'showErrorMessage');
    const informationMessages: string[] = [];
    const errorMessages: string[] = [];

    Object.defineProperty(vscode.window, 'showInformationMessage', {
      configurable: true,
      value: ((message: string) => {
        informationMessages.push(message);
        return Promise.resolve(undefined);
      }) as typeof vscode.window.showInformationMessage,
    });

    Object.defineProperty(vscode.window, 'showErrorMessage', {
      configurable: true,
      value: ((message: string) => {
        errorMessages.push(message);
        return Promise.resolve(undefined);
      }) as typeof vscode.window.showErrorMessage,
    });

    return {
      informationMessages,
      errorMessages,
      restore() {
        if (infoDescriptor) {
          Object.defineProperty(vscode.window, 'showInformationMessage', infoDescriptor);
        }

        if (errorDescriptor) {
          Object.defineProperty(vscode.window, 'showErrorMessage', errorDescriptor);
        }
      },
    };
  }

  suiteSetup(async () => {
    await activateExtension();
    const configuration = vscode.workspace.getConfiguration('annotation');
    originalBehavior = configuration.inspect('behavior')?.workspaceValue;
    originalMethodTags = configuration.inspect('method.tags')?.workspaceValue;
  });

  setup(async () => {
    await updateAnnotationSettings(undefined, undefined);
  });

  teardown(async () => {
    await updateAnnotationSettings(originalBehavior, originalMethodTags);
    await TestWorkspace.closeAllEditors();
  });

  suiteTeardown(async () => {
    await updateAnnotationSettings(originalBehavior, originalMethodTags);

    for (const filePath of createdFiles) {
      await TestWorkspace.removeIfExists(filePath);
    }

    const rootPath = await TestWorkspace.getRootPath();
    await TestWorkspace.removeIfExists(path.join(rootPath, '.tmp-tests'));
  });

  test('addAnnotations covers classes, methods, enums, interfaces, properties, and typedefs', async () => {
    const editor = await openFixture(
      'test-fixtures/feature-coverage.input.ts',
      'feature-coverage.batch.ts',
    );

    await vscode.commands.executeCommand('addAnnotations');
    const text = editor.document.getText();

    assert.ok(text.includes('@interface'));
    assert.ok(text.includes('@enum'));
    assert.ok(text.includes('@typedef'));
    assert.ok(text.includes('@class'));
    assert.ok(text.includes('@constructor'));
    assert.ok(text.includes('@property'));
    assert.ok(text.includes('@method'));
    assert.ok(text.includes('@throws {Error}'));
    assert.ok(text.includes('@template T'));
    assert.ok(text.includes('@template TInput'));
  });

  test('addAnnotation supports interface method signatures through AST parsing', async () => {
    const editor = await openFixture(
      'test-fixtures/feature-coverage.input.ts',
      'feature-coverage.single.ts',
    );

    await TestWorkspace.placeCursor(editor, 'map<U>(callback');
    await vscode.commands.executeCommand('addAnnotation');

    const text = editor.document.getText();
    assert.ok(text.includes('@method'));
    assert.ok(text.includes('@param {(item: T) => U} callback'));
    assert.ok(text.includes('@returns {Result<U>}'));
    assert.ok(text.includes('@template U'));
  });

  test('workspace settings can replace existing comments and disable tags', async () => {
    await updateAnnotationSettings(
      { mode: 'replace' },
      {
        returnsTag: false,
        descriptionTag: false,
        nameTag: true,
        paramsTag: true,
      },
    );

    const editor = await openFixture('test-fixtures/replace-mode.input.ts', 'replace-mode.ts');
    await TestWorkspace.placeCursor(editor, 'sum(left');
    await vscode.commands.executeCommand('addAnnotation');

    const text = editor.document.getText();
    assert.ok(!text.includes('old doc'));
    assert.ok(text.includes('@name sum'));
    assert.ok(text.includes('@param {number} left'));
    assert.ok(!text.includes('@returns'));
    assert.ok(!text.includes('@description'));
  });

  test('workspace settings skip mode avoids duplicating an existing docblock', async () => {
    await updateAnnotationSettings({ mode: 'skip' }, undefined);

    const editor = await openFixture('test-fixtures/replace-mode.input.ts', 'skip-mode.ts');
    await TestWorkspace.placeCursor(editor, 'sum(left');
    await vscode.commands.executeCommand('addAnnotation');

    const text = editor.document.getText();
    const docblockCount = (text.match(/\/\*\*/g) || []).length;
    assert.strictEqual(docblockCount, 1);
    assert.ok(text.includes('old doc'));
  });

  test('addAnnotation reports when skip mode leaves an existing docblock untouched', async () => {
    await updateAnnotationSettings({ mode: 'skip' }, undefined);

    const messages = captureWindowMessages();
    try {
      const editor = await openFixture('test-fixtures/replace-mode.input.ts', 'skip-message.ts');
      await TestWorkspace.placeCursor(editor, 'sum(left');
      await vscode.commands.executeCommand('addAnnotation');

      assert.deepStrictEqual(messages.errorMessages, []);
      assert.ok(messages.informationMessages.includes(commandMessages.skippedExisting));
    } finally {
      messages.restore();
    }
  });

  test('addAnnotation reports when the current line has no parsable declaration', async () => {
    const messages = captureWindowMessages();
    try {
      const editor = await openFixture(
        'test-fixtures/feature-coverage.input.ts',
        'no-declaration-message.ts',
      );
      const blankLineOffset = editor.document.getText().indexOf('\n\nenum RequestState');
      assert.notStrictEqual(blankLineOffset, -1, 'Expected a blank line before the enum fixture.');

      const position = editor.document.positionAt(blankLineOffset + 1);
      editor.selection = new vscode.Selection(position, position);
      editor.revealRange(new vscode.Range(position, position));

      await vscode.commands.executeCommand('addAnnotation');

      assert.deepStrictEqual(messages.errorMessages, []);
      assert.ok(messages.informationMessages.includes(commandMessages.noDeclarationFound));
    } finally {
      messages.restore();
    }
  });
});
