"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]') // [] brackets means that this is an optional value for commander
    .description('Open a file for editing')
    .option('-port, --port <number>', 'port to run the server on', '4005') // <> brackets means that is a required value for commander
    .action(function (filename, options) {
    if (filename === void 0) { filename = 'notebook.js'; }
    // first arg is the optional value, next is an object with required value
    console.log(filename, options);
});
