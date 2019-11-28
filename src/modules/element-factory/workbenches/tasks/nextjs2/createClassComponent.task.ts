// #region Local Imports
import { nextjs2 } from '../../../../paths';
import { ICommon } from '../../../../typings';
import { createClassComponentParams } from '../../params/nextjs2.params';
import {
    getTemplate,
    addToIndex,
    createFile,
    writeFile
} from '../../operations';
import {
    createInterface,
    createStyle,
    addReducer,
    addAction,
    addRoute
} from '.';
// #endregion Local Imports

export const createClassComponent = (options: ICommon.IAnswers): void => {
    const {
        templatePath,
        indexTemplatePath,
        addReducerParams,
        addActionParams,
        componentTestTemplatePath
    } = createClassComponentParams;

    const { fileName, lowerFileName, isConnectStore, isPage } = options;

    options.isScss = options.hasStyle === 'scss';
    options.isStyled = options.hasStyle === 'styled';

    if (isPage) {
        options.classDir = `${nextjs2.pagesDir}/${lowerFileName}`;

        const addRouteParams = {
            routesDir: nextjs2.routesDir,
            routesTemplate: nextjs2.templates.addRouteTemplate
        };

        addRoute(options, addRouteParams);
    } else {
        options.classDir = `${nextjs2.componentsDir}/${fileName}`;

        const addIndexParams: ICommon.IAddIndex = {
            dirPath: `${nextjs2.componentsDir}/index.ts`,
            getFileContent: () => getTemplate(indexTemplatePath, options),
            message: 'Component added to index.ts'
        };

        addToIndex(addIndexParams);
    }

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${options.classDir}/index.tsx`,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new class component.'
    };

    const writeTestFileProps: ICommon.IWriteFile = {
        dirPath: `${options.classDir}/index.spec.tsx`,
        getFileContent: () => getTemplate(componentTestTemplatePath, options),
        message: 'Added unit test of component.'
    };

    createFile(options.classDir);
    writeFile(writeFileProps, /;(?:(\n|\r|\s))*$/);
    !isPage && writeFile(writeTestFileProps);
    createInterface(options);
    createStyle(options);

    if (isConnectStore) {
        addReducer(options, addReducerParams);
        addAction(options, addActionParams);
    }
};
