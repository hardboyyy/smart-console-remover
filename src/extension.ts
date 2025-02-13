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
		const options: vscode.QuickPickItem[] = [
            { label: 'Remove', description: 'Remove all console statements' },
            { label: 'Comment Out', description: 'Comment out all console statements' },
            { label: 'Uncomment', description: 'Uncomment all console statements' }
        ];

		const selection = await vscode.window.showQuickPick(options, {
            placeHolder: 'Choose an action for console statements'
        });

        if (!selection) {
            return;
        }

			console.log('Your extension smart-console-remover', activeEditor?.document.languageId);

			const document = activeEditor?.document;
			const text = document.getText();
			const regex = /console\.(log|warn|error|debug|info)\([\s\S]*?\)\s*;?/g;
			// const regex = /\bhello\b/g;
			// const selection = {
			// 	label: "Remove",
			// 	description: "remove the logs"
			// };
			const newText = removeConsoleLogs(text, selection.label);

			const edits: vscode.TextEdit[] = [];
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
				vscode.window.showInformationMessage(`${edits.length - 1} console.logs has been removed successfully`);
			});
			
			
			console.log("edits: ", edits);

			
			vscode.window.showInformationMessage(`Selected file extension: ${activeEditor.document.languageId}`);
		// }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
