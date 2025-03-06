// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { removeConsoleLogs, languageIds } from './utils';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

const LOGGER_KEY_PREFIX = 'customLoggerName_';  // Prefix for storing logger names

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('smart-console-remover.smartConsoleRemover', async() => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const activeEditor = vscode.window.activeTextEditor;
		
		if (!activeEditor) {
			return;
		}
		const documentUri = activeEditor.document.uri;
    	const workspaceFolder = vscode.workspace.getWorkspaceFolder(documentUri);
		if (!workspaceFolder) {
			vscode.window.showErrorMessage('No workspace folder found!');
			return;
		}
		const relativePath = vscode.workspace.asRelativePath(documentUri, false);
    const folderPath = `${workspaceFolder.uri.fsPath}/${relativePath.split('/').slice(0, -1).join('/')}`;
    const loggerKey = LOGGER_KEY_PREFIX + folderPath;  // Unique key per folder

	let customLogger = context.workspaceState.get<string>(loggerKey);

    // Ask for logger name only if not set for this folder
    if (!customLogger) {
        customLogger = await vscode.window.showInputBox({
            prompt: `Enter a custom logger name for ${relativePath.split('/').slice(0, -1).join('/')} (or leave empty for default: console)`,
            placeHolder: 'e.g., logger, morga',
            ignoreFocusOut: true,
        });

        // Save the logger name if provided, otherwise default to 'console'
        customLogger = customLogger?.trim() || 'console';
        await context.workspaceState.update(loggerKey, customLogger);
    }

    const loggerPattern = `console|${customLogger}`;
    const methodPattern = `log|warn|error|debug|info`;

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
			const regex = /^\s*console\.(log|warn|error|debug|info)\s*\(/gm;
			// const regex = /\bhello\b/g;
			// const selection = {
			// 	label: "Remove",
			// 	description: "remove the logs"
			// };
			const newText = removeConsoleLogs(text, selection.label, loggerPattern);

			activeEditor.edit(editBuilder => {
				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(text.length)
				);
				editBuilder.replace(fullRange, newText);
				vscode.window.showInformationMessage(`${(text.match(regex) || []).length} console.logs has been removed successfully`);
			});
		// }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
