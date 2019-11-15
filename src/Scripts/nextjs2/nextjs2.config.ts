import { Config } from '../../config';
import { INextjs2Helper } from './INextjs2Types';

export const createInterfaceParams: INextjs2Helper.ICreateInterfaceParams = {
    templatePath: Config.nextjs2.templates.createInterfaceTempPath,
    pageInterfaceIndex: Config.nextjs2.templates.pageInterfaceIndex,
    storeImportInterface: Config.nextjs2.templates.storeImportInterface,
    compInterfaceIndex: Config.nextjs2.templates.compInterfaceIndex,
    storeInterface: Config.nextjs2.templates.storeInterface,
    interfaceDir: Config.nextjs2.interfaceDir,
    reduxInterfaceDir: Config.nextjs2.reduxInterfaceDir,
    pageInterfaceDir: Config.nextjs2.pageInterfaceDir,
    compInterfaceDir: Config.nextjs2.compInterfaceDir,
    componentsDir: Config.nextjs2.componentsDir
};

export const addActionConstIndexParams: INextjs2Helper.IAddActionConstIndexParams = {
    actionConstTemplatePath: Config.nextjs2.templates.actionConstTemplatePath,
    actionConstsFileDir: Config.nextjs2.actionConstsFileDir
};

export const addActionParams: INextjs2Helper.IAddActionParams = {
    actionIndexTemplatePath: Config.nextjs2.templates.actionIndexTemplatePath,
    actionTemplatePath: Config.nextjs2.templates.actionTemplatePath,
    actionTestTemplatePath: Config.nextjs2.templates.actionTestTemplatePath
};

export const addReducerParams: INextjs2Helper.IAddReducerParams = {
    addActionConstIndexParams,
    reducerIndexTemplatePath: Config.nextjs2.templates.reducerIndexTemplatePath,
    reducerStoreTemplatePath: Config.nextjs2.templates.reducerStoreTemplatePath,
    reducerTemplatePath: Config.nextjs2.templates.reducerTemplatePath,
    reducerTestTemplatePath: Config.nextjs2.templates.reducerTestTemplatePath
};

export const createClassComponentParams: INextjs2Helper.ICreateClassComponentParams = {
    templatePath: Config.nextjs2.templates.classComponentTemplatePath,
    indexTemplatePath: Config.nextjs2.templates.componentIndexTemplatePath,
    createInterfaceParams,
    addReducerParams,
    addActionParams
};

export const createFuncComponentParams: INextjs2Helper.ICreateFuncComponentParams = {
    templatePath: Config.nextjs2.templates.funcComponentTemplate,
    indexTemplatePath: Config.nextjs2.templates.componentIndexTemplatePath,
    componentsDir: Config.nextjs2.componentsDir,
    createInterfaceParams,
    componentTestTemplatePath: Config.nextjs2.templates.componentTestTemplatePath
};

export const createStyleParams: INextjs2Helper.ICreateStyle = {
    templatePath: Config.nextjs2.templates.stylePageTemplate,
    compDirPath: Config.nextjs2.componentsDir,
    pageDirPath: Config.nextjs2.pagesDir
};

export const createStyledComponentParams: INextjs2Helper.ICreateStyle = {
    templatePath: Config.nextjs2.templates.styledComponentsTemplatePath,
    compDirPath: Config.nextjs2.componentsDir,
    pageStyledDirPath: Config.nextjs2.pageStyledDir
};
