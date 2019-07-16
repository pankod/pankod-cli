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
                if (val.length) {
                    if (Common_1.CommonHelper.isAlreadyExist(config_1.Config.repositoriesDir, val, true)) {
                        return 'Already added use new entity name';
                    }
                    return true;
                }
                return 'Cannot be empty';
            }
        }
    ],
    service: [
        {
            message: 'Enter service name',
            name: 'fileName',
            type: 'input',
            validate(val) {
                if (val.length) {
                    if (helper_1.Helper.isServiceAlreadyExist(config_1.Config.servicesDir, val)) {
                        return 'Already added use new service name';
                    }
                    return true;
                }
                return 'Cannot be empty';
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
    entity: answers => {
        helper_1.Helper.createRepository(answers);
    },
    service: answers => {
        helper_1.Helper.createService(answers);
    }
};
exports.default = {
    showQuestions: (type) => __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer.prompt(questions[type]);
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        actions[type](answers);
    })
};
//# sourceMappingURL=index.js.map