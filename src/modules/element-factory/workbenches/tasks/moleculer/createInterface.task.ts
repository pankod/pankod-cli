// #region Local Imports
import {
    getTemplate,
    createFile,
    writeFile,
    addToIndex
} from '../../operations';
import { ICommon, IMoleculerHelper } from '../../../../typings';
import { moleculer } from '../../../../paths';
// #endregion Local Imports

export const createInterface = (
    answers: ICommon.IAnswers,
    dirType: string,
    prefix: string = '',
    createInterfaceParams: IMoleculerHelper.ICreateInterfaceParams
) => {
    const templatePath = `${createInterfaceParams.templatePath}/${prefix}Interface.mustache`;
    const templateProps = { upperFileName: answers.upperFileName, dirType };

    const interfaceFilePath = `${moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
    const interfaceDirPath = `${moleculer.interfaceDir}/${dirType}/${answers.upperFileName}`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: interfaceFilePath,
        getFileContent: () => getTemplate(templatePath, templateProps),
        message: 'Created new interface file.'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${moleculer.interfaceDir}/index.ts`,
        getFileContent: () =>
            getTemplate(
                createInterfaceParams.indexInterfaceTemplate,
                templateProps
            ),
        message: 'Interface added to index.ts.'
    };

    const addFolderIndex: ICommon.IAddIndex = {
        dirPath: `${moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
        getFileContent: () =>
            getTemplate(
                createInterfaceParams.folderIndexTemplate,
                templateProps
            ),
        message: 'Interface added to folder index.ts.'
    };

    createFile(interfaceDirPath);
    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    addToIndex(addFolderIndex);
};
