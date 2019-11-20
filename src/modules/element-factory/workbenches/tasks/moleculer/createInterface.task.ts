// #region Local Imports
import { CommonHelper } from '../../Common';
import { IMoleculerHelper } from '../IMoleculerTypes';
import { ICommon } from '../../ICommon';
import * as paths from '../../../../paths';
// #endregion Local Imports

export const createInterface = (
    answers: ICommon.IAnswers,
    dirType: string,
    prefix: string = '',
    createInterfaceParams: IMoleculerHelper.ICreateInterfaceParams
) => {
    const templatePath = `${createInterfaceParams.templatePath}/${prefix}Interface.mustache`;
    const templateProps = { upperFileName: answers.upperFileName, dirType };

    const interfaceFilePath = `${paths.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
    const interfaceDirPath = `${paths.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: interfaceFilePath,
        getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
        message: 'Created new interface file.'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${paths.moleculer.interfaceDir}/index.ts`,
        getFileContent: () =>
            CommonHelper.getTemplate(createInterfaceParams.indexInterfaceTemplate, templateProps),
        message: 'Interface added to index.ts.'
    };

    const addFolderIndex: ICommon.IAddIndex = {
        dirPath: `${paths.moleculer.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
        getFileContent: () =>
            CommonHelper.getTemplate(createInterfaceParams.folderIndexTemplate, templateProps),
        message: 'Interface added to folder index.ts.'
    };

    CommonHelper.createFile(interfaceDirPath);
    CommonHelper.writeFile(writeFileProps);
    CommonHelper.addToIndex(addIndexParams);
    CommonHelper.addToIndex(addFolderIndex);
};
