// #region Local Imports
import { nextjs2 } from '../../../../paths';
import { ICommon } from '../../../../typings';
import { createFuncComponentParams } from '../../params/nextjs2.params';
import {
    getTemplate,
    createFile,
    addToIndex,
    writeFile
} from '../../operations';
import {
    createInterface,
    createStyle,
    addReducer,
    addAction,
    addRoute
} from '.';
// #region Local Imports

export const createFuncComponent = (options: ICommon.IAnswers): void => {
    const {
        templatePath,
        indexTemplatePath,
        componentTestTemplatePath,
        addReducerParams,
        addActionParams
    } = createFuncComponentParams;

    const { lowerFileName, hasStyle, isPage, isConnectStore } = options;

    options.isScss = hasStyle === 'scss';
    options.isStyled = hasStyle === 'styled';

    if (isPage) {
        options.funcComponentDir = `${nextjs2.pagesDir}/${lowerFileName}`;

        const addRouteParams = {
            routesDir: nextjs2.routesDir,
            routesTemplate: nextjs2.templates.addRouteTemplate
        };

        addRoute(options, addRouteParams);
    } else {
        options.funcComponentDir = `${nextjs2.componentsDir}/${options.fileName}`;

        const addIndexParams: ICommon.IAddIndex = {
            dirPath: `${nextjs2.componentsDir}/index.ts`,
            getFileContent: () => getTemplate(indexTemplatePath, options),
            message: 'Component added to index.ts'
        };

        addToIndex(addIndexParams);
    }

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${options.funcComponentDir}/index.tsx`,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new functional component.'
    };

    const writeTestFileProps: ICommon.IWriteFile = {
        dirPath: `${options.funcComponentDir}/index.spec.tsx`,
        getFileContent: () => getTemplate(componentTestTemplatePath, options),
        message: 'Added unit test of component.'
    };

    createFile(options.funcComponentDir);
    writeFile(writeFileProps, /;(?:(\n|\r|\s))*$/);
    !isPage && writeFile(writeTestFileProps);
    createInterface(options);
    createStyle(options);

    if (isConnectStore) {
        addReducer(options, addReducerParams);
        addAction(options, addActionParams);
    }
};
