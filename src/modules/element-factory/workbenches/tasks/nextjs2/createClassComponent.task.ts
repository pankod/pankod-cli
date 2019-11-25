// #region DEBUGGING
import chalk from 'chalk';
const { red, blue, bold } = chalk;
// #endregion DEBUGGING


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

    console.log(blue(`I'm about to create a ${bold('ClassComponent')} for you.`));

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
        console.log(blue(`I see you want it to be a ${bold('Page')}.`));

        options.classDir = `${nextjs2.pagesDir}/${lowerFileName}`;

        const addRouteParams = {
            routesDir: nextjs2.routesDir,
            routesTemplate: nextjs2.templates.addRouteTemplate
        };

        addRoute(options, addRouteParams);

        console.log(blue(`Added route.`));
    } else {
        console.log(blue(`I see you want it to be a ${bold('just ClassComponent')}.`));

        options.classDir = `${nextjs2.componentsDir}/${options.fileName}`;

        const addIndexParams: ICommon.IAddIndex = {
            dirPath: `${nextjs2.componentsDir}/index.ts`,
            getFileContent: () => getTemplate(indexTemplatePath, options),
            message: 'Component added to index.ts'
        };
        
        addToIndex(addIndexParams);

        console.log(blue(`Added to component index.`));
    }

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${options.classDir}/index.tsx`,
        getFileContent: () => getTemplate(templatePath, options),
        message: 'Added new class component'
    };

    createFile(options.classDir);
    console.log(blue(`Component directory created at ${bold(options.classDir)}`));

    writeFile(writeFileProps);
    console.log(blue(`Component is written at ${bold(writeFileProps.dirPath)}`));

    createInterface(options);
    console.log(blue(`Component interface created.`));

    createStyle(options);
    console.log(blue(`Component style created as ${bold(options.isScss ? 'scss': 'styled')}.`));

    if (isConnectStore) {
        addReducer(options, addReducerParams);
        console.log(blue(`Component's reducer created.`));

        addAction(options, addActionParams);
        console.log(blue(`Component's actions created.`));
    }

    console.log(blue(`ClassComponent has been created ${bold('successfully!')}`));
};
