// #region Local Imports
import { IMoleculerHelper } from '../../../typings';
import * as paths from '../../../paths';
// #endregion Local Imports

const createInterfaceParams = {
    folderIndexTemplate: paths.moleculer.templates.createInterfaceFolderIndexTemplate,
    indexInterfaceTemplate: paths.moleculer.templates.createInterfaceIndexInterfaceTemplate,
    templatePath: paths.moleculer.templates.createInterfaceTemplatePath
};

export const createServiceParams: IMoleculerHelper.ICreateServiceParams = {
    indexTemplate: paths.moleculer.templates.createServiceIndexTemplate,
    integrationTemplatePath: paths.moleculer.templates.createServiceIntegrationTestTemplate,
    templatePath: paths.moleculer.templates.createServiceTemplatePath,
    testTemplatePath: paths.moleculer.templates.createServiceTestTemplate,
    brokerHelperTemplatesParams: {
        brokerHelperCreate: paths.moleculer.templates.brokerHelperCreate,
        brokerHelperImport: paths.moleculer.templates.brokerHelperImport,
        replaceFileDir: paths.moleculer.brokerHelper
    },
    createServiceHelperParams: {
        indexTemplate: paths.moleculer.templates.createServiceHelperIndexTemplate,
        templatePath: paths.moleculer.templates.createServiceHelperTemplatePath,
        testTemplatePath: paths.moleculer.templates.createServiceHelperTestTemplatePath
    },
    createInterfaceParams
};

export const createRepositoryParams: IMoleculerHelper.ICreateRepositoryParams = {
    indexTemplate: paths.moleculer.templates.createRepositoryIndexTemplate,
    templatePath: paths.moleculer.templates.createRepositoryTemplatePath,
    testTemplatePath: paths.moleculer.templates.createRepositoryTestTemplatePath,
    createInterfaceParams,
    createEntityTemplatesParams: {
        indexTemplate: paths.moleculer.templates.createEntityIndexTemplate,
        templatePath: paths.moleculer.templates.createEntityTemplatePath
    }
};
