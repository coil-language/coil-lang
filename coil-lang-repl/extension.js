// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "coil-lang-repl" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  // register a 'command' "option"

  let disposable_2 = vscode.commands.registerCommand(
    "coil-lang-repl.coilEval",
    function () {
      return new vscode.Hover({
        language: "Hello language",
        value: "Hello Value",
      });
    }
  );

  let disposable = vscode.languages.registerHoverProvider("coil", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      if (word == "HELLO") {
        // return new vscode.MarkdownString("hey");
        return new vscode.Hover({
          language: "Hello language",
          value: "Hello Value",
        });
      }
    },
  });

  vscode.languages.registerEvaluatableExpressionProvider("coil", {
    provideEvaluatableExpression(document, position, token) {
      let range = new vscode.Range(
        new vscode.Position(position.line, 0),
        new vscode.position(position.line, 100)
      );
      const text = document.getText(range);

      return new vscode.EvaluatableExpression(range, eval(text));
    },
  });

  let disposable_1 = vscode.commands.registerCommand(
    "coil-lang-repl.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed
      vscode.window.showErrorMessage("yeee");

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from coil-lang-repl!");
    }
  );

  context.subscriptions.push(disposable, disposable_1, disposable_2);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
