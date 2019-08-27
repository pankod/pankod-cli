"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questions = {
    moleculer: {
        choices: ['Entity', 'Service'],
        message: 'What would you like to add?',
        name: 'fileType',
        type: 'list'
    },
    nextjs: {
        choices: ['Page', 'Functional Component', 'Class Component', 'Plugin'],
        message: 'What do you want to add?',
        name: 'fileType',
        type: 'list'
    },
    svelte: {
        choices: ['Component'],
        message: 'What do you want to add?',
        name: 'fileType',
        type: 'list'
    },
};
exports.default = questions;
