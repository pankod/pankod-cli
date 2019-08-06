"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const inquirer = require("inquirer");
//#region Global Imports
//#region Local Imports
const config_1 = require("../../config");
const Common_1 = require("../Common");
const helper_1 = require("./helper");
//#endregion Local Imports
const questions = {
    entity: [
        {
            message: 'Enter entity name',
            name: 'fileName',
            type: 'input',
            validate(val) {
                return Common_1.CommonHelper.validate(val, config_1.Config.moleculer.repositoriesDir, true, 'entity');
            }
        }
    ],
    service: [
        {
            message: 'Enter service name',
            name: 'fileName',
            type: 'input',
            validate(val) {
                return Common_1.CommonHelper.validate(val, config_1.Config.moleculer.servicesDir, true, 'service');
            }
        },
        {
            default: true,
            message: 'Is service open to outside?',
            name: 'isPrivate',
            type: 'confirm'
        },
        {
            default: true,
            message: 'Are you going to have a database connection?',
            name: 'hasDatabase',
            type: 'confirm'
        }
    ]
};
const actions = {
    entity: (answers) => {
        helper_1.Helper.createRepository(answers);
    },
    service: (answers) => {
        helper_1.Helper.createService(answers);
    }
};
exports.default = {
    showQuestions: async (type) => {
        const lowerCaseType = type.toLowerCase();
        const answers = await inquirer.prompt(questions[lowerCaseType]);
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        actions[lowerCaseType](answers);
    }
};
