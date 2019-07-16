"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const fs = require("fs");
const logSymbols = require("log-symbols");
const mustache = require("mustache");
const path = require("path");
//#endregion Global Imports
//#region Local Imports
const config_1 = require("../../config");
//#endregion Local Imports
exports.Helper = {
    isAlreadyExist: (startPath, val, isFile) => {
        val = val.replace(/\b\w/g, foo => foo.toUpperCase());
        const _path = isFile ? `${startPath}/${val}.ts` : `${startPath}/${val}`;
        return fs.existsSync(path.resolve('', _path));
    },
    isServiceAlreadyExist: (startPath, val) => {
        val = val.replace(/\b\w/g, foo => foo.toLowerCase());
        const _path = `${startPath}/${val}.service.ts`;
        return fs.existsSync(path.resolve('', _path));
    },
    getTemplate: (templatePath, templateProps) => (mustache.render(fs.readFileSync(path.resolve('project-cli', templatePath), 'utf8'), templateProps)),
    createFile: (dirPath) => {
        fs.mkdirSync(path.resolve('', dirPath));
    },
    writeFile: (params) => {
        fs.writeFile(path.resolve('', params.dirPath), params.getFileContent(), err => {
            if (err)
                throw err;
            console.log(logSymbols.success, params.message);
        });
    },
    addToIndex: (params) => {
        fs.appendFile(path.resolve('', params.dirPath), `${params.getFileContent()}\n`, err => {
            if (err)
                throw err;
            console.log(logSymbols.success, params.message);
        });
    },
    createInterface: (answers, dirType, prefix = '') => {
        const templatePath = `./helper_scripts/Templates/Interfaces/${prefix}Interface.mustache`;
        const indexInterfaceTemplate = './helper_scripts/Templates/Interfaces/index.mustache';
        const folderIndexTemplate = './helper_scripts/Templates/Interfaces/FolderIndex.mustache';
        const templateProps = { upperFileName: answers.upperFileName, dirType };
        const interfaceFilePath = `${config_1.Config.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
        const interfaceDirPath = `${config_1.Config.interfaceDir}/${dirType}/${answers.upperFileName}`;
        const writeFileProps = {
            dirPath: interfaceFilePath,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Created new interface file.'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.interfaceDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexInterfaceTemplate, templateProps),
            message: 'Interface added to index.ts.'
        };
        const addFolderIndex = {
            dirPath: `${config_1.Config.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(folderIndexTemplate, templateProps),
            message: 'Interface added to folder index.ts.'
        };
        exports.Helper.createFile(interfaceDirPath);
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        exports.Helper.addToIndex(addFolderIndex);
    },
    createEntityInstance: (answers) => {
        const templatePath = './helper_scripts/Templates/Repositories/Entity.mustache';
        const templateProps = { fileName: answers.fileName };
        const indexTemplate = './helper_scripts/Templates/Repositories/EntityIndex.mustache';
        const writeFileProps = {
            dirPath: `${config_1.Config.entityDir}/${answers.fileName}.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Entity Instance.'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.entityDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Entity added to index.ts.'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
    },
    createTest: (options) => {
        const writeFileProps = {
            dirPath: options.dirPath,
            getFileContent: () => exports.Helper.getTemplate(options.templatePath, options.templateProps),
            message: options.successMessage
        };
        exports.Helper.writeFile(writeFileProps);
    },
    addBrokerHelper: (answers) => {
        const brokerHelperImport = './helper_scripts/Templates/Tests/BrokerHelperImport.mustache';
        const brokerHelperCreate = './helper_scripts/Templates/Tests/BrokerHelperCreate.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName
        };
        const replaceBrokerImportParams = {
            fileDir: config_1.Config.brokerHelper,
            filetoUpdate: fs.readFileSync(path.resolve('', config_1.Config.brokerHelper), 'utf8'),
            getFileContent: () => exports.Helper.getTemplate(brokerHelperImport, templateProps),
            message: 'Service added to BrokerHelper Import',
            regexKey: /\/\/\#endregion Local Imports/g
        };
        setTimeout(() => {
            const replaceBrokerCreateParams = {
                fileDir: config_1.Config.brokerHelper,
                filetoUpdate: fs.readFileSync(path.resolve('', config_1.Config.brokerHelper), 'utf8'),
                getFileContent: () => exports.Helper.getTemplate(brokerHelperCreate, templateProps),
                message: 'Service added to BrokerHelper setupBroker.\n',
                regexKey: /^\s*return broker;/gm
            };
            exports.Helper.replaceContent(replaceBrokerCreateParams);
        }, 1500);
        exports.Helper.replaceContent(replaceBrokerImportParams);
    },
    replaceContent: (params) => {
        const replaceFile = params.filetoUpdate.replace(params.regexKey, params.getFileContent());
        const writeFileProps = {
            dirPath: params.fileDir,
            getFileContent: () => replaceFile,
            message: params.message
        };
        exports.Helper.writeFile(writeFileProps);
    },
    createIntegrationTest: (options) => {
        const integrationProps = {
            dirPath: options.dirPath,
            getFileContent: () => exports.Helper.getTemplate(options.templatePath, options.templateProps),
            message: options.successMessage
        };
        exports.Helper.writeFile(integrationProps);
    },
    createServiceHelper: (answers) => {
        const templatePath = './helper_scripts/Templates/Services/Helper.mustache';
        const indexTemplate = './helper_scripts/Templates/Services/HelperIndex.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Service Helper'
        };
        const addIndexParams = {
            dirPath: `${config_1.Config.servicesHelperDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Service Helper added to index.ts.'
        };
        const serviceHelperTestParams = {
            templatePath: './helper_scripts/Templates/Tests/ServiceHelper.mustache',
            templateProps,
            answers,
            dirPath: `${config_1.Config.serviceHelperTestDir}/${answers.upperFileName}Helper.spec.ts`,
            successMessage: 'Added new Micro Service Helper test.'
        };
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        exports.Helper.createTest(serviceHelperTestParams);
    },
    createRepository: (answers) => {
        const templatePath = './helper_scripts/Templates/Repositories/Repository.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName
        };
        const indexTemplate = './helper_scripts/Templates/Repositories/RepoIndex.mustache';
        const addIndexParams = {
            dirPath: `${config_1.Config.repositoriesDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Repository added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.repositoriesDir}/${answers.fileName}.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Repository.'
        };
        const repositoryTestParams = {
            answers,
            dirPath: `${config_1.Config.repositoriesTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Repository test.',
            templatePath: './helper_scripts/Templates/Tests/Repository.mustache',
            templateProps
        };
        if (!exports.Helper.isAlreadyExist(config_1.Config.interfaceDir, answers.fileName)) {
            exports.Helper.createInterface(answers, 'Repositories');
        }
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        exports.Helper.createEntityInstance(answers);
        exports.Helper.createTest(repositoryTestParams);
    },
    createService: (answers) => {
        const templatePath = './helper_scripts/Templates/Services/Service.mustache';
        const templateProps = {
            fileName: answers.fileName,
            upperFileName: answers.upperFileName,
            isPrivate: answers.isPrivate,
            hasDatabase: answers.hasDatabase
        };
        const indexTemplate = './helper_scripts/Templates/Services/index.mustache';
        const addIndexParams = {
            dirPath: `${config_1.Config.servicesDir}/index.ts`,
            getFileContent: () => exports.Helper.getTemplate(indexTemplate, templateProps),
            message: 'Service added to index.ts.'
        };
        const writeFileProps = {
            dirPath: `${config_1.Config.servicesDir}/${answers.fileName}.service.ts`,
            getFileContent: () => exports.Helper.getTemplate(templatePath, templateProps),
            message: 'Added new Service.'
        };
        const serviceTestParams = {
            answers,
            dirPath: `${config_1.Config.servicesTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Microservice test.',
            templatePath: './helper_scripts/Templates/Tests/Service.mustache',
            templateProps
        };
        const integrationTestParams = {
            answers,
            dirPath: `${config_1.Config.integrationTestDir}/${answers.fileName}.spec.ts`,
            successMessage: 'Added new Integration test.',
            templatePath: './helper_scripts/Templates/Tests/IntegrationTest.mustache',
            templateProps
        };
        if (!exports.Helper.isAlreadyExist(config_1.Config.interfaceDir, answers.fileName)) {
            exports.Helper.createInterface(answers, 'Services', 'Service');
        }
        exports.Helper.writeFile(writeFileProps);
        exports.Helper.addToIndex(addIndexParams);
        exports.Helper.createServiceHelper(answers);
        exports.Helper.createTest(serviceTestParams);
        exports.Helper.createIntegrationTest(integrationTestParams);
        exports.Helper.addBrokerHelper(answers);
    }
};
//# sourceMappingURL=Helper.js.map