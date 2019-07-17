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
    showQuestions: (type) => __awaiter(this, void 0, void 0, function* () {
        const lowerCaseType = type.toLowerCase();
        const answers = yield inquirer.prompt(questions[lowerCaseType]);
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        actions[lowerCaseType](answers);
    })
};
//# sourceMappingURL=index.js.map