"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("../../operations");
const nextjs2_params_1 = require("../../params/nextjs2.params");
const paths_1 = require("../../../../paths");
const _1 = require(".");
// #region Local Imports
exports.createClassComponent = (options) => {
    const { templatePath, indexTemplatePath, addReducerParams, addActionParams } = nextjs2_params_1.createClassComponentParams;
    const { lowerFileName, isConnectStore, isPage } = options;
    options.isScss = options.hasStyle === 'scss';
    options.isStyled = options.hasStyle === 'styled';
    // TODO: Modularize Preparation of Params
    if (isPage) {
        options.classDir = `${paths_1.nextjs2.pagesDir}/${lowerFileName}`;
        const addRouteParams = {
            routesDir: paths_1.nextjs2.routesDir,
            routesTemplate: paths_1.nextjs2.templates.addRouteTemplate
        };
        _1.addRoute(options, addRouteParams);
    }
    else {
        options.classDir = `${paths_1.nextjs2.componentsDir}/${options.fileName}`;
        const addIndexParams = {
            dirPath: `${paths_1.nextjs2.componentsDir}/index.ts`,
            getFileContent: () => operations_1.getTemplate(indexTemplatePath, options),
            message: 'Component added to index.ts'
        };
        operations_1.addToIndex(addIndexParams);
    }
    const writeFileProps = {
        dirPath: `${options.classDir}/index.tsx`,
        getFileContent: () => operations_1.getTemplate(templatePath, options),
        message: 'Added new class component'
    };
    operations_1.createFile(options.classDir);
    operations_1.writeFile(writeFileProps);
    _1.createInterface(options);
    _1.createStyle(options);
    if (isConnectStore) {
        _1.addReducer(options, addReducerParams);
        _1.addAction(options, addActionParams);
    }
};
