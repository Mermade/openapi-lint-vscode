// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const yaml = require('yaml');
const validator = require('oas-validator');
const resolver = require('oas-resolver');
const converter = require('swagger2openapi');

function convert(yamlMode, resolve) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('You must have an open editor window to convert an OpenAPI document');
        return; // No open text editor
    }
    if (resolve && editor.document.isUntitled) {
        vscode.window.showWarningMessage('Document must be saved in order to resolve correctly');
        return; // No open text editor
    }
    converter.convertStr(editor.document.getText(),{ patch: true, warnOnly: true, resolve: resolve, source: editor.document.fileName, fatal: true }, function(err, options) {
        if (yamlMode) {
            vscode.workspace.openTextDocument({ language: 'yaml', content: yaml.stringify(options.openapi) })
            .then(function(doc) {
                vscode.window.showTextDocument(doc);
            });
        }
        else {
            vscode.workspace.openTextDocument({ language: 'json', content: JSON.stringify(options.openapi, null, 2)})
            .then(function(doc) {
                vscode.window.showTextDocument(doc);
            });
        }
    });
}

function translate(yamlMode) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('You must have an open editor window to convert an OpenAPI document');
        return; // No open text editor
    }

    let text = editor.document.getText();
    try {
        let obj = yaml.parse(text);
        let out = '';
        if (yamlMode) {
            out = yaml.stringify(obj);
        }
        else {
           out = JSON.stringify(obj, null, 2);
        }
        editor.edit(builder => {
			const document = editor.document;
			const lastLine = document.lineAt(document.lineCount - 2);

			const start = new vscode.Position(0, 0);
			const end = new vscode.Position(document.lineCount - 1, lastLine.text.length);

            builder.replace(new vscode.Range(start, end), out);
        });
    }
    catch (ex) {
        vscode.window.showErrorMessage('Could not parse OpenAPI document!\n'+ex.message);
        console.warn(ex.message);
    }
}

function bundle() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('You must have an open editor window to resolve an OpenAPI document');
        return; // No open text editor
    }
    if (editor.document.isUntitled) {
        vscode.window.showWarningMessage('Document must be saved in order to resolve correctly');
        return; // No open text editor
    }
    let text = editor.document.getText();
    let yamlMode = false;
    let obj = {};
    try {
        obj = JSON.parse(text);
    }
    catch (ex) {
        try {
            obj = yaml.parse(text);
            yamlMode = true;
        }
        catch (ex) {
            vscode.window.showErrorMessage('Could not parse OpenAPI document as JSON or YAML');
            console.warn(ex.message);
            return;
        }
    }
    resolver.resolve(obj, editor.document.fileName, {})
    .then(function(options){
        if (yamlMode) {
            vscode.workspace.openTextDocument({ language: 'yaml', content: yaml.stringify(options.openapi) })
            .then(function(doc) {
                vscode.window.showTextDocument(doc);
            })
            .then(function(ex) {
                console.error(ex);
            });
        }
        else {
            vscode.workspace.openTextDocument({ language: 'json', content: JSON.stringify(options.openapi, null, 2)})
            .then(function(doc) {
                vscode.window.showTextDocument(doc);
            })
            .then(function(ex){
                console.error(ex);
            });
        }
    })
    .catch(function(ex){
        vscode.window.showWarningMessage('Could not parse OpenAPI document as JSON or YAML');
        console.warn(ex.message);
    });
}

function validate(lint, resolve) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('You must have an open editor window to validate an OpenAPI document');
        return; // No open text editor
    }

    if (resolve && editor.document.isUntitled) {
        vscode.window.showWarningMessage('Document must be saved in order to resolve correctly');
        return; // No open text editor
    }

    let text = editor.document.getText();
    try {
        let options = { lint: lint, resolve: resolve, fatal: true, source: editor.document.fileName };
        let obj = yaml.parse(text);
        validator.validate(obj, options)
        .then(function(options){
            vscode.window.showInformationMessage('Your OpenAPI document is:' + (lint ? 'excellent!' : 'valid.'));
        })
	    .catch(function(ex){
	    	let message = 'Your OpenAPI document is not '+(options.valid ? 'perfect' : 'valid') + ' :( \n';
	    	if (options.context) message += options.context.pop()+' \n';
            message += ex.message + '. \n';
            for (let warning of options.warnings||[]) {
                message += warning.message + ' ' + warning.pointer + ' ' + warning.ruleName + '. \n';
            }
            vscode.window.showErrorMessage(message);
	    });
    }
    catch (ex) {
        vscode.window.showErrorMessage('Could not parse OpenAPI document as JSON or YAML!');
        console.warn(ex.message);
    }
}

/*function optionallyValidateOnSave(document) {
    return new Promise(function(resolve,reject){
        let text = document.getText();
        try {
            let obj = yaml.parse(text);
            if (!obj || (!obj.openapi && !obj.swagger)) reject(false);
            let options = {};
            try {
                validator.validateSync(obj, options);
                resolve(true);
            }
            catch (ex) {
                let message = 'Your OpenAPI document is not valid :(\n';
                if (options.context) message += options.context.pop()+'\n';
                message += ex.message;
                vscode.window.showErrorMessage(message);
                // TODO maybe have a setting for preventing the save (if possible)?
                reject(false);
            }
        }
        catch (ex) {
            // fail to parse is not a problem
            resolve(true);
        }
    });
}
*/

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let cmdValidate = vscode.commands.registerCommand('extension.openapi-validate', function () {
    	validate(false, false);
    });

    let cmdLint = vscode.commands.registerCommand('extension.openapi-lint', function () {
    	validate(true, false);
    });

    let cmdValidateResolved = vscode.commands.registerCommand('extension.openapi-validate-resolved', function () {
    	validate(false, true);
    });

    let cmdLintResolved = vscode.commands.registerCommand('extension.openapi-lint-resolved', function () {
    	validate(true, true);
    });

    let cmdBundle = vscode.commands.registerCommand('extension.openapi-bundle', function () {
    	bundle();
    });

    let cmdTranslateToJson = vscode.commands.registerCommand('extension.openapi-to-json', function() {
        translate(false);
    });

    let cmdTranslateToYaml = vscode.commands.registerCommand('extension.openapi-to-yaml', function() {
        translate(true);
    });

    let cmdConvertJson = vscode.commands.registerCommand('extension.openapi-convert-json', function() {
        convert(false, false);
    });

    let cmdConvertYaml = vscode.commands.registerCommand('extension.openapi-convert-yaml', function() {
        convert(true, false);
    });

    let cmdConvertJsonResolved = vscode.commands.registerCommand('extension.openapi-convert-json-resolved', function() {
        convert(false, true);
    });

    let cmdConvertYamlResolved = vscode.commands.registerCommand('extension.openapi-convert-yaml-resolved', function() {
        convert(true, true);
    });

    context.subscriptions.push(cmdValidate);
    context.subscriptions.push(cmdLint);
    context.subscriptions.push(cmdValidateResolved);
    context.subscriptions.push(cmdLintResolved);
    context.subscriptions.push(cmdBundle);
    context.subscriptions.push(cmdConvertJson);
    context.subscriptions.push(cmdConvertYaml);
    context.subscriptions.push(cmdConvertJsonResolved);
    context.subscriptions.push(cmdConvertYamlResolved);
    context.subscriptions.push(cmdTranslateToJson);
    context.subscriptions.push(cmdTranslateToYaml);

    //context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(function(document){
    //    return optionallyValidateOnSave(document);
    //}));
    //console.log('openapi-lint: Installed save handler')

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Extension "openapi-lint" activated. '+context.subscriptions.length);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
