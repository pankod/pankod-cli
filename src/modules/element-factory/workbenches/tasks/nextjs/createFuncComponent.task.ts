// #region Local Imports
import { ICommon } from '../../../../typings';
import {
    getTemplate,
    createFile,
    writeFile,
    addToIndex
} from '../../operations';
import { createFuncComponentParams } from '../../params/nextjs.params';
import { createInterface } from '.';
// #endregion Local Imports

export const createFuncComponent = (answers: ICommon.IAnswers): void => {
    const { lowerFileName, fileName, hasStyle } = answers;

    const {
        componentsDir,
        indexTemplatePath,
        templatePath,
        createInterfaceParams
    } = createFuncComponentParams;

    const funcDir = `${componentsDir}/${answers.fileName}`;

    const templateProps = {
        fileName,
        hasStyle,
        interfaceName: `I${fileName}`,
        lowerFileName
    };

    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${componentsDir}/index.ts`,
        getFileContent: () => getTemplate(indexTemplatePath, templateProps),
        message: 'Component added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${funcDir}/index.tsx`,
        getFileContent: () => getTemplate(templatePath, templateProps),
        message: 'Add new functional component.'
    };

    createFile(funcDir);
    writeFile(writeFileProps);
    addToIndex(addIndexParams);
    createInterface(answers, false, createInterfaceParams);
};
