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
const createInterfaceParams = {
    folderIndexTemplate: config_1.Config.moleculer.templates.createInterfaceFolderIndexTemplate,
    indexInterfaceTemplate: config_1.Config.moleculer.templates.createInterfaceIndexInterfaceTemplate,
    templatePath: config_1.Config.moleculer.templates.createInterfaceTemplatePath
};
const actions = {
    entity: (answers) => {
        const createRepositoryParams = {
            indexTemplate: config_1.Config.moleculer.templates.createRepositoryIndexTemplate,
            templatePath: config_1.Config.moleculer.templates.createRepositoryTemplatePath,
            testTemplatePath: config_1.Config.moleculer.templates.createRepositoryTestTemplatePath,
            createInterfaceParams,
            createEntityTemplatesParams: {
                indexTemplate: config_1.Config.moleculer.templates.createEntityIndexTemplate,
                templatePath: config_1.Config.moleculer.templates.createEntityTemplatePath
            }
        };
        helper_1.Helper.createRepository(answers, createRepositoryParams);
    },
    service: (answers) => {
        const createServiceParams = {
            indexTemplate: config_1.Config.moleculer.templates.createServiceIndexTemplate,
            integrationTemplatePath: config_1.Config.moleculer.templates.createServiceIntegrationTestTemplate,
            templatePath: config_1.Config.moleculer.templates.createServiceTemplatePath,
            testTemplatePath: config_1.Config.moleculer.templates.createServiceTestTemplate,
            brokerHelperTemplatesParams: {
                brokerHelperCreate: config_1.Config.moleculer.templates.brokerHelperCreate,
                brokerHelperImport: config_1.Config.moleculer.templates.brokerHelperImport,
                replaceFileDir: config_1.Config.moleculer.brokerHelper
            },
            createServiceHelperParams: {
                indexTemplate: config_1.Config.moleculer.templates.createServiceHelperIndexTemplate,
                templatePath: config_1.Config.moleculer.templates.createServiceHelperTemplatePath,
                testTemplatePath: config_1.Config.moleculer.templates.createServiceHelperTestTemplatePath
            },
            createInterfaceParams,
        };
        helper_1.Helper.createService(answers, createServiceParams);
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
