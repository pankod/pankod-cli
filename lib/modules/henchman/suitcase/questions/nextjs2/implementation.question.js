"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const inquirer = require("inquirer");
const chalk_1 = require("chalk");
// #endregion Local Imports
const { italic } = chalk_1.default;
exports.implementation = {
    message: `What's your preferred implementation?`,
    name: 'implementation',
    type: 'list',
    default: 'functional',
    choices: [
        new inquirer.Separator(),
        {
            name: `const Awesome = () => { ... } - ${italic.grey('Functional Component')}`,
            value: 'functional'
        },
        {
            name: `class Awesome { ... } - ${italic.grey('Class Component')}`,
            value: 'object-oriented'
        }
    ]
};
