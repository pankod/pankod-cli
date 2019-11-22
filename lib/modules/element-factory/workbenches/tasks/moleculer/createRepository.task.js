"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Local Imports
const operations_1 = require("../../operations");
const paths_1 = require("../../../../paths");
const moleculer_params_1 = require("../../params/moleculer.params");
const _1 = require(".");
// #endregion Local Imports
exports.createRepository = (answers) => {
    const templatePath = moleculer_params_1.createRepositoryParams.templatePath;
    const templateProps = {
        upperFileName: answers.upperFileName
    };
    const indexTemplate = moleculer_params_1.createRepositoryParams.indexTemplate;
    const addIndexParams = {
        dirPath: `${paths_1.moleculer.repositoriesDir}/index.ts`,
        getFileContent: () => operations_1.getTemplate(indexTemplate, templateProps),
        message: 'Repository added to index.ts.'
    };
    const writeFileProps = {
        dirPath: `${paths_1.moleculer.repositoriesDir}/${answers.upperFileName}.ts`,
        getFileContent: () => operations_1.getTemplate(templatePath, templateProps),
        message: 'Added new Repository.'
    };
    const repositoryTestParams = {
        answers,
        dirPath: `${paths_1.moleculer.repositoriesTestDir}/${answers.upperFileName}.spec.ts`,
        successMessage: 'Added new Repository test.',
        templatePath: moleculer_params_1.createRepositoryParams.testTemplatePath,
        templateProps
    };
    if (!operations_1.isAlreadyExist(paths_1.moleculer.interfaceDir, answers.upperFileName)) {
        _1.createInterface(answers, 'Repositories', '', moleculer_params_1.createRepositoryParams.createInterfaceParams);
    }
    operations_1.writeFile(writeFileProps);
    operations_1.addToIndex(addIndexParams);
    _1.createEntityInstance(answers, moleculer_params_1.createRepositoryParams.createEntityTemplatesParams);
    _1.createTest(repositoryTestParams);
};
