"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const fs = require("fs");
const path = require("path");
//#endregion Global Imports
//#region Local Imports
const config_1 = require("../../config");
const Common_1 = require("../Common");
//#endregion Local Imports
exports.Helper = {
    addBrokerHelper: (answers) => {
        const brokerHelperImport = './dist/Templates/moleculer/Tests/BrokerHelperImport.mustache';
        const brokerHelperCreate = './dist/Templates/moleculer/Tests/BrokerHelperCreate.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName
        };
        const replaceBrokerImportParams = {
            fileDir: config_1.Config.brokerHelper,
            filetoUpdate: fs.readFileSync(path.resolve('', config_1.Config.brokerHelper), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(brokerHelperImport, templateProps),
            message: 'Service added to BrokerHelper Import',
            regexKey: /\/\/\#endregion Local Imports/g
        };
        setTimeout(() => {
            const replaceBrokerCreateParams = {
                fileDir: config_1.Config.brokerHelper,
                filetoUpdate: fs.readFileSync(path.resolve('', config_1.Config.brokerHelper), 'utf8'),
                getFileContent: () => Common_1.CommonHelper.getTemplate(brokerHelperCreate, templateProps),
                message: 'Service added to BrokerHelper setupBroker.\n',
                regexKey: /^\s*return broker;/gm
            };
            Common_1.CommonHelper.replaceContent(replaceBrokerCreateParams);
        }, 1500);
        Common_1.CommonHelper.replaceContent(replaceBrokerImportParams);
    },
    createEntityInstance: (answers) => {
        const templatePath = './dist/Templates/moleculer/Repositories/Entity.mustache';
        const templateProps = { fileName: answers.fileName };
        const indexTemplate = './dist/Templates/moleculer/Repositories/EntityIndex.mustache';
        const writeFileProps = {
            dirPath: `${config_1.Config.entityDir}/${answers.fileName}.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new Entity Instance.'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.entityDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplate, templateProps),
            message: 'Entity added to index.ts.'
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
    },
    createRepository: (answers) => {
        const templatePath = './dist/Templates/moleculer/Repositories/Repository.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName
        };
        const indexTemplate = './dist/Templates/moleculer/Repositories/RepoIndex.mustache';
        const addIndexParams = {
            dirPath: `${config_1.Config.repositoriesDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplate, templateProps),
            message: 'Repository added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.repositoriesDir}/${answers.fileName}.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new Repository.'
        };
        const repositoryTestParams = {
            answers,
            dirPath: `${config_1.Config.repositoriesTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Repository test.',
            templatePath: './dist/Templates/moleculer/Tests/Repository.mustache',
            templateProps
        };
        if (!Common_1.CommonHelper.isAlreadyExist(config_1.Config.interfaceDir, answers.fileName)) {
            exports.Helper.createInterface(answers, 'Repositories');
        }
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        exports.Helper.createEntityInstance(answers);
        exports.Helper.createTest(repositoryTestParams);
    },
    createService: (answers) => {
        const templatePath = './dist/Templates/moleculer/Services/Service.mustache';
        const templateProps = {
            fileName: answers.fileName,
            hasDatabase: answers.hasDatabase,
            isPrivate: answers.isPrivate,
            upperFileName: answers.upperFileName
        };
        const indexTemplate = './dist/Templates/moleculer/Services/index.mustache';
        const addIndexParams = {
            dirPath: `${config_1.Config.servicesDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplate, templateProps),
            message: 'Service added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.servicesDir}/${answers.fileName}.service.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new Service.'
        };
        const serviceTestParams = {
            answers,
            dirPath: `${config_1.Config.servicesTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Microservice test.',
            templatePath: './dist/Templates/moleculer/Tests/Service.mustache',
            templateProps
        };
        const integrationTestParams = {
            answers,
            dirPath: `${config_1.Config.integrationTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Integration test.',
            templatePath: './dist/Templates/moleculer/Tests/IntegrationTest.mustache',
            templateProps
        };
        if (!Common_1.CommonHelper.isAlreadyExist(config_1.Config.interfaceDir, answers.fileName)) {
            exports.Helper.createInterface(answers, 'Services', 'Service');
        }
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        exports.Helper.createServiceHelper(answers);
        exports.Helper.createTest(serviceTestParams);
        exports.Helper.createIntegrationTest(integrationTestParams);
        exports.Helper.addBrokerHelper(answers);
    },
    createServiceHelper: (answers) => {
        const templatePath = './dist/Templates/moleculer/Services/Helper.mustache';
        const indexTemplate = './dist/Templates/moleculer/Services/HelperIndex.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new Service Helper'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.servicesHelperDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplate, templateProps),
            message: 'Service Helper added to index.ts.'
        };
        const serviceHelperTestParams = {
            answers,
            dirPath: `${config_1.Config.serviceHelperTestDir}/${answers.upperFileName}Helper.spec.ts`,
            successMessage: 'Added new Micro Service Helper test.',
            templatePath: './dist/Templates/moleculer/Tests/ServiceHelper.mustache',
            templateProps
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        exports.Helper.createTest(serviceHelperTestParams);
    },
    createIntegrationTest: (options) => {
        const integrationProps = {
            dirPath: options.dirPath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(options.templatePath, options.templateProps),
            message: options.successMessage
        };
        Common_1.CommonHelper.writeFile(integrationProps);
    },
    createInterface: (answers, dirType, prefix = '') => {
        const templatePath = `./dist/Templates/moleculer/Interfaces/${prefix}Interface.mustache`;
        const indexInterfaceTemplate = './dist/Templates/moleculer/Interfaces/index.mustache';
        const folderIndexTemplate = './dist/Templates/moleculer/Interfaces/FolderIndex.mustache';
        const templateProps = { upperFileName: answers.upperFileName, dirType };
        const interfaceFilePath = `${config_1.Config.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
        const interfaceDirPath = `${config_1.Config.interfaceDir}/${dirType}/${answers.upperFileName}`;
        const writeFileProps = {
            dirPath: interfaceFilePath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Created new interface file.'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.interfaceDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexInterfaceTemplate, templateProps),
            message: 'Interface added to index.ts.'
        };
        const addFolderIndex = {
            dirPath: `${config_1.Config.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(folderIndexTemplate, templateProps),
            message: 'Interface added to folder index.ts.'
        };
        Common_1.CommonHelper.createFile(interfaceDirPath);
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        Common_1.CommonHelper.addToIndex(addFolderIndex);
    },
    createTest: (options) => {
        const writeFileProps = {
            dirPath: options.dirPath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(options.templatePath, options.templateProps),
            message: options.successMessage
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
    },
    isServiceAlreadyExist: (startPath, val) => {
        val = val.replace(/\b\w/g, foo => foo.toLowerCase());
        const _path = `${startPath}/${val}.service.ts`;
        return fs.existsSync(path.resolve('', _path));
    }
};
//# sourceMappingURL=helper.js.map