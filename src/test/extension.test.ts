import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { removeConsoleLogs } from '../utils';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Should remove single-line console logs', async () => {
        const inputCode = `console.log("Hello World");\nconst x = 10;`;
        const expectedOutput = `const x = 10;`;

        const result = removeConsoleLogs(inputCode, 'console.log');
        assert.strictEqual(result, expectedOutput);
    });

	test('Should remove multi-line console logs', async () => {
        const inputCode = `
        console.log("================================",
            "checking for",
            "================================"
        );
        let a = 5;
        `;
        const expectedOutput = `
        let a = 5;
        `;

        const result = removeConsoleLogs(inputCode, 'console.log');
        assert.strictEqual(result.trim(), expectedOutput.trim());
    });

	test('Should remove function-based console logs', async () => {
        const inputCode = `
        console.log('filter job', current(state.jobList), action.payload);
        let a = 5;
        `;
        const expectedOutput = `
        let a = 5;
        `;

        const result = removeConsoleLogs(inputCode, 'console.log');
        assert.strictEqual(result.trim(), expectedOutput.trim());
    });
});
