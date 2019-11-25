import { ICommon } from '../../../../typings';
import {
    getTemplate,
    addToIndex,
    createFile,
    writeFile
} from '../../operations';
import { createClassComponentParams } from '../../params/nextjs2.params';
import { nextjs2 } from '../../../../paths';
import {
    addRoute,
    createInterface,
    createStyle,
    addReducer,
    addAction
} from '.';
// #region Local Imports

export const createClassComponent = (options: ICommon.IAnswers): void => {
    const {
        templatePath,
        indexTemplatePath,
        addReducerParams,
        addActionParams
    } = createClassComponentParams;

    const { lowerFileName, isConnectStore, isPage } = options;

    options.isScss = options.hasStyle === 'scss';
    options.isStyled = options.hasStyle === 'styled';

    // TODO: Modularize Preparation of Params

    if (isPage) {
        options.classDir = `${nextjs2.pagesDir}/${lowerFileName}`;

        const addRouteParams = {
            routesDir: nextjs2.routesDir,
            routesTemplate: nextjs2.templates.addRouteTemplate
        };

        addRoute(options, addRouteParams);
    } else {
        options.classDir = `${nextjs2.componentsDir}/${options.fileName}`;

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
        message: 'Added new class component'
    };

    createFile(options.classDir);
    writeFile(writeFileProps);
    createInterface(options);
    createStyle(options);

    if (isConnectStore) {
        addReducer(options, addReducerParams);
        addAction(options, addActionParams);
    }
};
