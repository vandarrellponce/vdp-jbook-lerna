"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var commander_1 = require("commander");
var local_api_1 = require("local-api");
var path_1 = __importDefault(require("path"));
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-port, --port <number>', 'port to run the server on', '4005')
    .action(function (filename, options) {
    if (filename === void 0) { filename = 'notebook.js'; }
    var dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    var basename = path_1.default.basename(filename);
    local_api_1.serve(Number(options.port), basename, dir);
});
