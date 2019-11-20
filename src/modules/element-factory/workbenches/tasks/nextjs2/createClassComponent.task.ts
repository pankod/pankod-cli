// #region Local Imports
import { ICommon } from '../../ICommon';
import { CommonHelper } from '../../Common';
import { createClassComponentParams } from '../nextjs2.config';
import * as paths from '../../../../paths';
import * as Helpers from '.';
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
        options.classDir = `${paths.nextjs2.pagesDir}/${lowerFileName}`;

        const addRouteParams = {
            routesDir: paths.nextjs2.routesDir,
            routesTemplate: paths.nextjs2.templates.addRouteTemplate
        };

        Helpers.addRoute(options, addRouteParams);
    } else {
        options.classDir = `${paths.nextjs2.componentsDir}/${options.fileName}`;

        const addIndexParams: ICommon.IAddIndex = {
            dirPath: `${paths.nextjs2.componentsDir}/index.ts`,
            getFileContent: () => CommonHelper.getTemplate(indexTemplatePath, options),
            message: 'Component added to index.ts'
        };

        CommonHelper.addToIndex(addIndexParams);
    }

    const writeFileProps: ICommon.IWriteFile = {
        dirPath: `${options.classDir}/index.tsx`,
        getFileContent: () => CommonHelper.getTemplate(templatePath, options),
        message: 'Added new class component'
    };

    CommonHelper.createFile(options.classDir);
    CommonHelper.writeFile(writeFileProps);
    Helpers.createInterface(options);
    Helpers.createStyle(options);

    if (isConnectStore) {
        Helpers.addReducer(options, addReducerParams);
        Helpers.addAction(options, addActionParams);
    }
};
