// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const yaml = require('js-yaml');
const validator = require('oas-validator');

function validate(lint) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('You must have an open editor window to validate an OpenAPI document');
        return; // No open text editor
    }

    let text = editor.document.getText();
    try {
	let options = { lint: lint };
    let obj = yaml.safeLoad(text,{ json: true });
	let result = false;
        try {
            result = validator.validateSync(obj, options);
          	vscode.window.showInformationMessage('Your OpenAPI document is valid!');
	    	return;
        }
	    catch (ex) {
	    	let message = 'Your OpenAPI document is not valid :(\n';
	    	if (options.context) message += options.context.pop()+'\n';
	    	message += ex.message;
        	vscode.window.showErrorMessage(message);
	    }
    }
    catch (ex) {
        vscode.window.showErrorMessage('Could not parse OpenAPI document!');
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Extension "openapi-lint" activated.');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let cmdValidate = vscode.commands.registerCommand('extension.openapi-validate', function () {
        // The code you place here will be executed every time your command is executed
    	validate(false);
    });

    let cmdLint = vscode.commands.registerCommand('extension.openapi-lint', function () {
        // The code you place here will be executed every time your command is executed
    	validate(true);
    });

    context.subscriptions.push(cmdValidate);
    context.subscriptions.push(cmdLint);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
