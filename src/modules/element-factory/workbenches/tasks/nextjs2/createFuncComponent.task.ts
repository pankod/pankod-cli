// #region Local Imports
import { ICommon } from '../../../../typings';
import {
    getTemplate,
    writeFile,
    createFile,
    addToIndex
} from '../../operations';
import { createFuncComponentParams } from '../../params';
import { createInterface, createStyle } from '.';
// #region Local Imports

export const createFuncComponent = (options: ICommon.IAnswers): void => {
    const {
        componentsDir,
        templatePath,
        indexTemplatePath,
        componentTestTemplatePath
    } = createFuncComponentParams;

    const { fileName, hasStyle } = options;

    options.isScss = hasStyle === 'scss';
    options.isStyled = hasStyle === 'styled';

    const funcComponentDir = `${componentsDir}/${fileName}`;

    // TODO: # Modularize Preparation of Props
    const addIndexParams: ICommon.IAddIndex = {
        dirPath: `${componentsDir}/index.ts`,
        getFileContent: () => getTemplate(indexTemplatePath, options),
        message: 'Component added to index.ts.'
    };

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${funcComponentDir}/index.tsx`,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new functional component.'
    };

    const writeTestFileProps: ICommon.IWriteFile = {
        dirPath: `${funcComponentDir}/index.spec.tsx`,
        getFileContent: () => getTemplate(componentTestTemplatePath, options),
        message: 'Added unit test of component.'
    };
    // TODO: / Modularize Preparation of Props

    createFile(funcComponentDir);
    writeFile(writeFileProps);
    writeFile(writeTestFileProps);
    addToIndex(addIndexParams);
    createInterface(options);
    createStyle(options);
};
