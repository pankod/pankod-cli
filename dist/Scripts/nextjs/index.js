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
const commonQuestions = {
    addStyle: {
        default: true,
        message: 'Do you want to add style file?',
        name: 'isHaveStyle',
        type: 'confirm'
    },
    connectStore: {
        default: false,
        message: 'Do you want to connect store ?',
        name: 'isConnectStore',
        type: 'confirm'
    },
    enterComponentName: {
        message: 'Enter component name',
        name: 'fileName',
        type: 'input',
        validate(val) {
            return Common_1.CommonHelper.validate(val, config_1.Config.nextjs.componentsDir, false, 'component');
        }
    },
    isHaveReducer: {
        choices: [
            new inquirer.Separator(),
            {
                name: 'Yes, I want to have new reducer.',
                value: true
            },
            {
                name: 'No, do not create a new reducer.',
                value: false
            }
        ],
        message: 'Do you want to create a new reducer or use your own?',
        name: 'isHaveReducer',
        type: 'list',
        when: ({ isConnectStore }) => isConnectStore
    }
};
const questions = {
    class: [
        commonQuestions.enterComponentName,
        commonQuestions.connectStore,
        commonQuestions.isHaveReducer,
        commonQuestions.addStyle
    ],
    functional: [
        commonQuestions.enterComponentName,
        commonQuestions.addStyle
    ],
    page: [
        {
            message: 'Enter page name',
            name: 'fileName',
            type: 'input',
            validate(val) {
                return Common_1.CommonHelper.validate(val, config_1.Config.nextjs.pagesDir, false, 'page');
            }
        },
        {
            choices: [
                new inquirer.Separator(),
                {
                    name: 'Yes, I want to add custom path?',
                    value: true
                },
                {
                    name: 'No, use default.',
                    value: false
                }
            ],
            message: 'Do you want to add custom route or use default route name?',
            name: 'isHavePath',
            type: 'list'
        },
        {
            message: 'Enter route name',
            name: 'routePath',
            type: 'input',
            when: ({ isHavePath }) => isHavePath
        },
        commonQuestions.connectStore,
        commonQuestions.isHaveReducer,
        commonQuestions.addStyle
    ]
};
const actions = {
    class: (answers) => __awaiter(this, void 0, void 0, function* () {
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        helper_1.Helper.createClassComponent(answers);
        if (answers.isHaveStyle) {
            helper_1.Helper.createStyle(answers);
        }
    }),
    functional: (answers) => __awaiter(this, void 0, void 0, function* () {
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        helper_1.Helper.createFuncComponent(answers);
        if (answers.isHaveStyle) {
            helper_1.Helper.createStyle(answers);
        }
    }),
    page: (answers) => __awaiter(this, void 0, void 0, function* () {
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        answers.isPage = true;
        helper_1.Helper.createClassComponent(answers);
        helper_1.Helper.addRoute(answers);
        if (answers.isHaveStyle) {
            helper_1.Helper.createStyle(answers);
        }
    })
};
exports.default = {
    showQuestions: (type) => __awaiter(this, void 0, void 0, function* () {
        const componentType = type.split(' ')[0].toLowerCase();
        const answers = yield inquirer.prompt(questions[componentType]);
        actions[componentType](answers);
    })
};
//# sourceMappingURL=index.js.map