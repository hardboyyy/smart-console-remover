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
        const loggerPattern = 'console|logger';
        const result = removeConsoleLogs(inputCode, 'Remove', loggerPattern);
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

        const loggerPattern = 'console|logger';
        const result = removeConsoleLogs(inputCode, 'Comment Out', loggerPattern);
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

        const loggerPattern = 'console|logger';
        const result = removeConsoleLogs(inputCode, 'Uncomment', loggerPattern);
        assert.strictEqual(result.trim(), expectedOutput.trim());
    });
});
