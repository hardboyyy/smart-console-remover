// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { removeConsoleLogs } from './utils';
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
    const folderPath = workspaceFolder.uri.fsPath;
    const loggerKey = LOGGER_KEY_PREFIX + folderPath;

	let customLogger = context.workspaceState.get<string>(loggerKey);

    // Ask for logger
    if (!customLogger) {
        customLogger = await vscode.window.showInputBox({
            prompt: `Enter a custom logger name for ${relativePath.split('/').slice(0, -1).join('/')} (or leave empty for default: console)`,
            placeHolder: 'e.g., logger, morga',
            ignoreFocusOut: true,
        });

        customLogger = customLogger?.trim() || 'console';
        await context.workspaceState.update(loggerKey, customLogger);
    }

    const loggerPattern = `console|${customLogger}`;

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

			const document = activeEditor?.document;
			const text = document.getText();
			const regex = new RegExp(`(${loggerPattern})\\.(log|warn|error|debug|info)\\((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*\\);?`, 'gs');

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
