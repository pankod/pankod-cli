// #region Local Imports
import { Config } from '../../config';
import { INextjsHelper } from './INextjsTypes';
// #endregion Local Imports

export const createInterfaceParams = {
    templatePath: Config.nextjs.templates.createInterfaceTempPath,
    pageInterfaceIndex: Config.nextjs.templates.pageInterfaceIndex,
    storeImportInterface: Config.nextjs.templates.storeImportInterface,
    compInterfaceIndex: Config.nextjs.templates.compInterfaceIndex,
    storeInterface: Config.nextjs.templates.storeInterface,
    interfaceDir: Config.nextjs.interfaceDir,
    reduxInterfaceDir: Config.nextjs.reduxInterfaceDir,
    pageInterfaceDir: Config.nextjs.pageInterfaceDir,
    compInterfaceDir: Config.nextjs.compInterfaceDir
};

export const addActionConstIndexParams: INextjsHelper.IAddActionConstIndexParams = {
    actionConstTemplatePath: Config.nextjs.templates.actionConstTemplatePath
};

export const addActionParams: INextjsHelper.IAddActionParams = {
    actionIndexTemplatePath: Config.nextjs.templates.actionIndexTemplatePath,
    actionTemplatePath: Config.nextjs.templates.actionTemplatePath
};

export const addReducerParams: INextjsHelper.IAddReducerParams = {
    addActionConstIndexParams,
    reducerIndexTemplatePath: Config.nextjs.templates.reducerIndexTemplatePath,
    reducerStoreTemplatePath: Config.nextjs.templates.reducerStoreTemplatePath,
    reducerTemplatePath: Config.nextjs.templates.reducerTemplatePath
};

export const createClassComponentParams: INextjsHelper.ICreateClassComponentParams = {
    templatePath: Config.nextjs.templates.classComponentTemplatePath,
    indexTemplatePath: Config.nextjs.templates.componentIndexTemplatePath,
    createInterfaceParams,
    addReducerParams,
    addActionParams
};

export const createFuncComponentParams: INextjsHelper.ICreateFuncComponentParams = {
    templatePath: Config.nextjs.templates.funcComponentTemplate,
    indexTemplatePath: Config.nextjs.templates.componentIndexTemplatePath,
    componentsDir: Config.nextjs.componentsDir,
    createInterfaceParams
};

export const createStyleParams: INextjsHelper.ICreateStyle = {
    compDirPath: Config.nextjs.componentsDir,
    pageDirPath: Config.nextjs.pagesDir,
    templatePath: Config.nextjs.templates.stylePageTemplate
};
