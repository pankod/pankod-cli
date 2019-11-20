// #region Local Imports
import * as paths from '../../../paths';
import { INextjs2Helper } from '../../../typings';
// #endregion Local Imports

export const createInterfaceParams: INextjs2Helper.ICreateInterfaceParams = {
    templatePath: paths.nextjs2.templates.createInterfaceTempPath,
    pageInterfaceIndex: paths.nextjs2.templates.pageInterfaceIndex,
    storeImportInterface: paths.nextjs2.templates.storeImportInterface,
    compInterfaceIndex: paths.nextjs2.templates.compInterfaceIndex,
    storeInterface: paths.nextjs2.templates.storeInterface,
    interfaceDir: paths.nextjs2.interfaceDir,
    reduxInterfaceDir: paths.nextjs2.reduxInterfaceDir,
    pageInterfaceDir: paths.nextjs2.pageInterfaceDir,
    compInterfaceDir: paths.nextjs2.compInterfaceDir,
    componentsDir: paths.nextjs2.componentsDir
};

export const addActionConstIndexParams: INextjs2Helper.IAddActionConstIndexParams = {
    actionConstTemplatePath: paths.nextjs2.templates.actionConstTemplatePath,
    actionConstsFileDir: paths.nextjs2.actionConstsFileDir
};

export const addActionParams: INextjs2Helper.IAddActionParams = {
    actionIndexTemplatePath: paths.nextjs2.templates.actionIndexTemplatePath,
    actionTemplatePath: paths.nextjs2.templates.actionTemplatePath,
    actionTestTemplatePath: paths.nextjs2.templates.actionTestTemplatePath
};

export const addReducerParams: INextjs2Helper.IAddReducerParams = {
    addActionConstIndexParams,
    reducerIndexTemplatePath: paths.nextjs2.templates.reducerIndexTemplatePath,
    reducerStoreTemplatePath: paths.nextjs2.templates.reducerStoreTemplatePath,
    reducerTemplatePath: paths.nextjs2.templates.reducerTemplatePath,
    reducerTestTemplatePath: paths.nextjs2.templates.reducerTestTemplatePath
};

export const createClassComponentParams: INextjs2Helper.ICreateClassComponentParams = {
    templatePath: paths.nextjs2.templates.classComponentTemplatePath,
    indexTemplatePath: paths.nextjs2.templates.componentIndexTemplatePath,
    createInterfaceParams,
    addReducerParams,
    addActionParams
};

export const createFuncComponentParams: INextjs2Helper.ICreateFuncComponentParams = {
    templatePath: paths.nextjs2.templates.funcComponentTemplate,
    indexTemplatePath: paths.nextjs2.templates.componentIndexTemplatePath,
    componentsDir: paths.nextjs2.componentsDir,
    createInterfaceParams,
    componentTestTemplatePath: paths.nextjs2.templates.componentTestTemplatePath
};

export const createStyleParams: INextjs2Helper.ICreateStyle = {
    templatePath: paths.nextjs2.templates.stylePageTemplate,
    compDirPath: paths.nextjs2.componentsDir,
    pageDirPath: paths.nextjs2.pagesDir
};

export const createStyledComponentParams: INextjs2Helper.ICreateStyle = {
    templatePath: paths.nextjs2.templates.styledComponentsTemplatePath,
    compDirPath: paths.nextjs2.componentsDir,
    pageStyledDirPath: paths.nextjs2.pageStyledDir
};
