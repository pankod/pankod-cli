// #region Local Imports
import { CommonHelper } from '../../Common';
import { Config } from '../../../config';
import { ICommon } from '../../ICommon';
import * as Helpers from '.';
import { createRepositoryParams } from '../moleculer.config';
// #endregion Local Imports

export const createRepository = (answers: ICommon.IAnswers): void => {
    const templatePath = createRepositoryParams.templatePath;

    const templateProps = {
        upperFileName: answers.upperFileName
    };

    const indexTemplate = createRepositoryParams.indexTemplate;

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${Config.moleculer.repositoriesDir}/index.ts`,
        getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
        message: 'Repository added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${Config.moleculer.repositoriesDir}/${answers.upperFileName}.ts`,
        getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
        message: 'Added new Repository.'
    };

    const repositoryTestParams = {
        answers,
        dirPath: `${Config.moleculer.repositoriesTestDir}/${answers.upperFileName}.spec.ts`,
        successMessage: 'Added new Repository test.',
        templatePath: createRepositoryParams.testTemplatePath,
        templateProps
    };

    if (!CommonHelper.isAlreadyExist(Config.moleculer.interfaceDir, answers.upperFileName)) {
        Helpers.createInterface(
            answers,
            'Repositories',
            '',
            createRepositoryParams.createInterfaceParams
        );
    }

    CommonHelper.writeFile(writeFileProps);
    CommonHelper.addToIndex(addIndexParams);
    Helpers.createEntityInstance(answers, createRepositoryParams.createEntityTemplatesParams);
    Helpers.createTest(repositoryTestParams);
};
