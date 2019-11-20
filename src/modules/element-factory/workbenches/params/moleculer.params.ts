// #region Local Imports
import { IMoleculerHelper } from './IMoleculerTypes';
import { Config } from '../../config';
// #endregion Local Imports

const createInterfaceParams = {
    folderIndexTemplate: Config.moleculer.templates.createInterfaceFolderIndexTemplate,
    indexInterfaceTemplate: Config.moleculer.templates.createInterfaceIndexInterfaceTemplate,
    templatePath: Config.moleculer.templates.createInterfaceTemplatePath
};

export const createServiceParams: IMoleculerHelper.ICreateServiceParams = {
    indexTemplate: Config.moleculer.templates.createServiceIndexTemplate,
    integrationTemplatePath: Config.moleculer.templates.createServiceIntegrationTestTemplate,
    templatePath: Config.moleculer.templates.createServiceTemplatePath,
    testTemplatePath: Config.moleculer.templates.createServiceTestTemplate,
    brokerHelperTemplatesParams: {
        brokerHelperCreate: Config.moleculer.templates.brokerHelperCreate,
        brokerHelperImport: Config.moleculer.templates.brokerHelperImport,
        replaceFileDir: Config.moleculer.brokerHelper
    },
    createServiceHelperParams: {
        indexTemplate: Config.moleculer.templates.createServiceHelperIndexTemplate,
        templatePath: Config.moleculer.templates.createServiceHelperTemplatePath,
        testTemplatePath: Config.moleculer.templates.createServiceHelperTestTemplatePath
    },
    createInterfaceParams
};

export const createRepositoryParams: IMoleculerHelper.ICreateRepositoryParams = {
    indexTemplate: Config.moleculer.templates.createRepositoryIndexTemplate,
    templatePath: Config.moleculer.templates.createRepositoryTemplatePath,
    testTemplatePath: Config.moleculer.templates.createRepositoryTestTemplatePath,
    createInterfaceParams,
    createEntityTemplatesParams: {
        indexTemplate: Config.moleculer.templates.createEntityIndexTemplate,
        templatePath: Config.moleculer.templates.createEntityTemplatePath
    }
};
