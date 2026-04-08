import { defineConfig } from '@vscode/test-cli';
import path from 'path';

const localVsCodePath = path.join(
	process.env.LOCALAPPDATA || '',
	'Programs',
	'Microsoft VS Code',
	'Code.exe',
);

export default defineConfig({
	files: 'out/test/**/*.test.js',
	workspaceFolder: '.',
	useInstallation: {
		fromPath: localVsCodePath,
	},
	download: {
		timeout: 120000,
	},
	mocha: {
		timeout: 20000,
	},
});
