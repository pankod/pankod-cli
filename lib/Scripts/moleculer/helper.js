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
    addBrokerHelper: (answers, brokerHelperTemplatesParams) => {
        setTimeout(() => {
            Common_1.CommonHelper.replaceContent(exports.Helper.createParamsForAddBrokerHelper('create', brokerHelperTemplatesParams, answers));
        }, 100);
        Common_1.CommonHelper.replaceContent(exports.Helper.createParamsForAddBrokerHelper('import', brokerHelperTemplatesParams, answers));
    },
    createEntityInstance: (answers, createEntityHelperParams) => {
        const templateProps = { fileName: answers.fileName };
        const writeFileProps = {
            dirPath: `${config_1.Config.moleculer.entityDir}/${answers.fileName}.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createEntityHelperParams.templatePath, templateProps),
            message: 'Added new Entity Instance.'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.moleculer.entityDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createEntityHelperParams.indexTemplate, templateProps),
            message: 'Entity added to index.ts.'
        };
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
    },
    createParamsForAddBrokerHelper: (type, brokerHelperTemplatesParams, answers) => {
        const templateProps = {
            lowerFileName: answers.lowerFileName,
            upperFileName: answers.upperFileName
        };
        const replaceBrokerParams = {
            fileDir: brokerHelperTemplatesParams.replaceFileDir,
            filetoUpdate: fs.readFileSync(path.resolve('', brokerHelperTemplatesParams.replaceFileDir), 'utf8'),
            getFileContent: () => Common_1.CommonHelper.getTemplate(type === 'import' ?
                brokerHelperTemplatesParams.brokerHelperImport :
                brokerHelperTemplatesParams.brokerHelperCreate, templateProps),
            message: type === 'import' ?
                'Service added to BrokerHelper Import' : 'Service added to BrokerHelper setupBroker.\n',
            regexKey: type === 'import' ? /\/\/#endregion Local Imports/g : /^\s*return broker;/gm
        };
        return replaceBrokerParams;
    },
    createRepository: (answers, createRepositoryParams) => {
        const templatePath = createRepositoryParams.templatePath;
        const templateProps = {
            upperFileName: answers.upperFileName
        };
        const indexTemplate = createRepositoryParams.indexTemplate;
        const addIndexParams = {
            dirPath: `${config_1.Config.moleculer.repositoriesDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(indexTemplate, templateProps),
            message: 'Repository added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.moleculer.repositoriesDir}/${answers.upperFileName}.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Added new Repository.'
        };
        const repositoryTestParams = {
            answers,
            dirPath: `${config_1.Config.moleculer.repositoriesTestDir}/${answers.upperFileName}.spec.ts`,
            successMessage: 'Added new Repository test.',
            templatePath: createRepositoryParams.testTemplatePath,
            templateProps
        };
        if (!Common_1.CommonHelper.isAlreadyExist(config_1.Config.moleculer.interfaceDir, answers.upperFileName)) {
            exports.Helper.createInterface(answers, 'Repositories', '', createRepositoryParams.createInterfaceParams);
        }
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        exports.Helper.createEntityInstance(answers, createRepositoryParams.createEntityTemplatesParams);
        exports.Helper.createTest(repositoryTestParams);
    },
    createService: (answers, createServiceParams) => {
        const templateProps = {
            fileName: answers.fileName,
            hasDatabase: answers.hasDatabase,
            isPrivate: answers.isPrivate,
            lowerFileName: answers.lowerFileName,
            upperFileName: answers.upperFileName
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.moleculer.servicesDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createServiceParams.indexTemplate, templateProps),
            message: 'Service added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.moleculer.servicesDir}/${answers.lowerFileName}.service.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createServiceParams.templatePath, templateProps),
            message: 'Added new Service.'
        };
        const serviceTestParams = {
            answers,
            dirPath: `${config_1.Config.moleculer.servicesTestDir}/${answers.lowerFileName}.spec.ts`,
            successMessage: 'Added new Microservice test.',
            templatePath: createServiceParams.testTemplatePath,
            templateProps
        };
        const integrationTestParams = {
            answers,
            dirPath: `${config_1.Config.moleculer.integrationTestDir}/${answers.lowerFileName}.spec.ts`,
            successMessage: 'Added new Integration test.',
            templatePath: createServiceParams.integrationTemplatePath,
            templateProps
        };
        if (!Common_1.CommonHelper.isAlreadyExist(config_1.Config.moleculer.interfaceDir, answers.upperFileName, true)) {
            exports.Helper.createInterface(answers, 'Services', 'Service', createServiceParams.createInterfaceParams);
        }
        Common_1.CommonHelper.writeFile(writeFileProps);
        Common_1.CommonHelper.addToIndex(addIndexParams);
        exports.Helper.createServiceHelper(answers, createServiceParams.createServiceHelperParams);
        exports.Helper.createTest(serviceTestParams);
        exports.Helper.createIntegrationTest(integrationTestParams);
        exports.Helper.addBrokerHelper(answers, createServiceParams.brokerHelperTemplatesParams);
    },
    createServiceHelper: (answers, createServiceHelperParams) => {
        const templateProps = {
            lowerFileName: answers.lowerFileName,
            upperFileName: answers.upperFileName
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.moleculer.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createServiceHelperParams.templatePath, templateProps),
            message: 'Added new Service Helper'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.moleculer.servicesHelperDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createServiceHelperParams.indexTemplate, templateProps),
            message: 'Service Helper added to index.ts.'
        };
        const serviceHelperTestParams = {
            answers,
            dirPath: `${config_1.Config.moleculer.serviceHelperTestDir}/${answers.upperFileName}Helper.spec.ts`,
            successMessage: 'Added new Micro Service Helper test.',
            templatePath: createServiceHelperParams.testTemplatePath,
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
    createInterface: (answers, dirType, prefix = '', createInterfaceParams) => {
        const templatePath = `${createInterfaceParams.templatePath}/${prefix}Interface.mustache`;
        const templateProps = { upperFileName: answers.upperFileName, dirType };
        const interfaceFilePath = `${config_1.Config.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
        const interfaceDirPath = `${config_1.Config.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}`;
        const writeFileProps = {
            dirPath: interfaceFilePath,
            getFileContent: () => Common_1.CommonHelper.getTemplate(templatePath, templateProps),
            message: 'Created new interface file.'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.moleculer.interfaceDir}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createInterfaceParams.indexInterfaceTemplate, templateProps),
            message: 'Interface added to index.ts.'
        };
        const addFolderIndex = {
            dirPath: `${config_1.Config.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
            getFileContent: () => Common_1.CommonHelper.getTemplate(createInterfaceParams.folderIndexTemplate, templateProps),
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
    }
};
