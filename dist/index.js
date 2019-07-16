#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const program = require("commander");
const figlet = require("figlet");
const inquirer = require("inquirer");
const project = process.argv.slice(3)[0].split('=')[1];
const text = {
    moleculer: 'microservice-cli'
};
console.clear();
console.log(chalk.default(figlet.textSync(text[project])));
const questions = {
    moleculer: [
        {
            choices: ['Entity', 'Service'],
            message: 'What would you like to add?',
            name: 'fileType',
            type: 'list'
        }
    ]
};
program
    .action(() => __awaiter(this, void 0, void 0, function* () {
    const answers = yield inquirer.prompt(questions[project]);
    const questionsHelper = require(`./Scripts/${project}/index`);
    questionsHelper.default.showQuestions(answers.fileType.toLowerCase());
}));
program.parse(process.argv);
//# sourceMappingURL=index.js.map