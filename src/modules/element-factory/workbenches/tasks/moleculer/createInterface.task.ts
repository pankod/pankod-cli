// #region Local Imports
import {
    getTemplate,
    createFile,
    writeFile,
    addToIndex
} from '../../operations';
import { ICommon } from '../../../../typings';
import { moleculer } from '../../../../paths';
import { createServiceParams } from '../../params/moleculer.params';
// #endregion Local Imports

export const createInterface = (
    options: ICommon.IAnswers,
    dirType: string,
    prefix: string = ''
) => {
    const {
        templatePath: templateFromParam,
        indexInterfaceTemplate,
        folderIndexTemplate
    } = createServiceParams.createInterfaceParams;

    const templatePath = `${templateFromParam}/${prefix}Interface.mustache`;

    const templateProps = {
        dirType,
        interfaceName: options.interfaceName,
        upperFileName: options.upperFileName,
    };

    const interfaceFilePath = `${moleculer.interfaceDir}/${dirType}/${options.upperFileName}/I${options.upperFileName}.d.ts`;
    const interfaceDirPath = `${moleculer.interfaceDir}/${dirType}/${options.upperFileName}`;

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: interfaceFilePath,
        getFileContent: () => getTemplate(templatePath, templateProps),
        message: 'Created new interface file.'
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${moleculer.interfaceDir}/index.ts`,
        getFileContent: () =>
            getTemplate(indexInterfaceTemplate, templateProps),
        message: 'Interface added to index.ts.'
    };

    const addFolderIndex: ICommon.IAddIndex = {
        dirPath: `${moleculer.interfaceDir}/${dirType}/${options.upperFileName}/index.ts`,
        getFileContent: () => getTemplate(folderIndexTemplate, templateProps),
        message: 'Interface added to folder index.ts.'
    };

    createFile(interfaceDirPath);
    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    addToIndex(addFolderIndex);
};
