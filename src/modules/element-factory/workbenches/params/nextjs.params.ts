// #region Local Imports
import * as paths from '../../../paths';
import { INextjsHelper } from '../../../typings';
// #endregion Local Imports

export const createInterfaceParams = {
    templatePath: paths.nextjs.templates.createInterfaceTempPath,
    pageInterfaceIndex: paths.nextjs.templates.pageInterfaceIndex,
    storeImportInterface: paths.nextjs.templates.storeImportInterface,
    compInterfaceIndex: paths.nextjs.templates.compInterfaceIndex,
    storeInterface: paths.nextjs.templates.storeInterface,
    interfaceDir: paths.nextjs.interfaceDir,
    reduxInterfaceDir: paths.nextjs.reduxInterfaceDir,
    pageInterfaceDir: paths.nextjs.pageInterfaceDir,
    compInterfaceDir: paths.nextjs.compInterfaceDir
};

export const addActionConstIndexParams: INextjsHelper.IAddActionConstIndexParams = {
    actionConstTemplatePath: paths.nextjs.templates.actionConstTemplatePath
};

export const addActionParams: INextjsHelper.IAddActionParams = {
    actionIndexTemplatePath: paths.nextjs.templates.actionIndexTemplatePath,
    actionTemplatePath: paths.nextjs.templates.actionTemplatePath
};

export const addReducerParams: INextjsHelper.IAddReducerParams = {
    addActionConstIndexParams,
    reducerIndexTemplatePath: paths.nextjs.templates.reducerIndexTemplatePath,
    reducerStoreTemplatePath: paths.nextjs.templates.reducerStoreTemplatePath,
    reducerTemplatePath: paths.nextjs.templates.reducerTemplatePath
};

export const createClassComponentParams: INextjsHelper.ICreateClassComponentParams = {
    templatePath: paths.nextjs.templates.classComponentTemplatePath,
    indexTemplatePath: paths.nextjs.templates.componentIndexTemplatePath,
    createInterfaceParams,
    addReducerParams,
    addActionParams
};

export const createFuncComponentParams: INextjsHelper.ICreateFuncComponentParams = {
    templatePath: paths.nextjs.templates.funcComponentTemplate,
    indexTemplatePath: paths.nextjs.templates.componentIndexTemplatePath,
    componentsDir: paths.nextjs.componentsDir,
    createInterfaceParams
};

export const createStyleParams: INextjsHelper.ICreateStyle = {
    compDirPath: paths.nextjs.componentsDir,
    pageDirPath: paths.nextjs.pagesDir,
    templatePath: paths.nextjs.templates.stylePageTemplate
};
