// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { removeConsoleLogs, languageIds } from './utils';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

;

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('smart-console-remover.smartConsoleRemover', async() => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const activeEditor = vscode.window.activeTextEditor;
		
		if (!activeEditor) {
			return;
		}
		
		//check the language of file
		if(languageIds.includes(activeEditor?.document.languageId)){

			console.log('Your extension smart-console-remover', activeEditor?.document.languageId);

			const document = activeEditor?.document;
			const text = document.getText();
			const regex = /console\.(log|warn|error|debug|info)\([\s\S]*?\)\s*;?/g;
			// const regex = /\bhello\b/g;
			const newText = removeConsoleLogs(text, "All");

			const edits: vscode.TextEdit[] = [];
			const counts: Number = 0;
			let match;

			while((match = regex.exec(text)) !== null) {
				console.log("match", match, regex.lastIndex);
				const fullRange = new vscode.Range(
					document.positionAt(match.index),
					document.positionAt(regex.lastIndex)
				);

				edits.push(vscode.TextEdit.replace(fullRange, newText));
			}

			activeEditor.edit(editBuilder => {
				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(text.length)
				);
				editBuilder.replace(fullRange, newText);
			});
			
			
			console.log("edits: ", edits);

			// if (edits.length > 0) {
			// 	const edit = new vscode.WorkspaceEdit();
			// 	edit.set(document.uri, edits[0]);
			// 	await vscode.workspace.applyEdit(edit);
			// 	vscode.window.showInformationMessage(`Replaced ${edits.length} occurrences of "hello" with "hi"!`);
			// } else {
			// 	vscode.window.showInformationMessage('No occurrences of "hello" found.');
			// }
			
			vscode.window.showInformationMessage(`Selected file extension: ${activeEditor.document.languageId}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
