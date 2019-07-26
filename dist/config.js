"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = {
    moleculer: {
        brokerHelper: './test/Utils/BrokerHelper.ts',
        entityDir: './src/Entities',
        integrationTestDir: './test/Integration',
        interfaceDir: './src/Interfaces',
        repositoriesDir: './src/Repositories',
        repositoriesTestDir: './test/Unit/Repositories',
        serviceHelperTestDir: './test/Unit/ServiceHelpers',
        servicesDir: './services',
        servicesHelperDir: './src/ServiceHelpers',
        servicesTestDir: './test/Unit/MicroServices',
        templates: {
            brokerHelperCreate: './dist/Templates/moleculer/Tests/BrokerHelperCreate.mustache',
            brokerHelperImport: './dist/Templates/moleculer/Tests/BrokerHelperImport.mustache',
            createEntityIndexTemplate: './dist/Templates/moleculer/Repositories/EntityIndex.mustache',
            createEntityTemplatePath: './dist/Templates/moleculer/Repositories/Entity.mustache',
            createServiceHelperIndexTemplate: './dist/Templates/moleculer/Services/HelperIndex.mustache',
            createServiceHelperTemplatePath: './dist/Templates/moleculer/Services/Helper.mustache',
            createServiceHelperTestTemplatePath: './dist/Templates/moleculer/Tests/ServiceHelper.mustache',
            createServiceIndexTemplate: './dist/Templates/moleculer/Services/index.mustache',
            createServiceIntegrationTestTemplate: './dist/Templates/moleculer/Tests/IntegrationTest.mustache',
            createServiceTemplatePath: './dist/Templates/moleculer/Services/Service.mustache',
            createServiceTestTemplate: './dist/Templates/moleculer/Tests/Service.mustache',
            createInterfaceFolderIndexTemplate: './dist/Templates/moleculer/Interfaces/FolderIndex.mustache',
            createInterfaceIndexInterfaceTemplate: './dist/Templates/moleculer/Interfaces/index.mustache',
            createInterfaceTemplatePath: './dist/Templates/moleculer/Interfaces',
        }
    },
    nextjs: {
        actionDir: './src/Actions',
        compInterfaceDir: './src/Interfaces/Components',
        componentsDir: './src/Components',
        definitionsDir: './src/Definitions',
        filesDir: './files',
        interfaceDir: './src/Interfaces',
        mockDir: '/dir',
        mockPagesDir: '/pages',
        mockSrcDir: '/src',
        pageInterfaceDir: './src/Interfaces/Pages',
        pagesDir: './pages',
        reducerDir: './src/Redux/Reducers',
        reduxInterfaceDir: './src/Interfaces/Redux',
        routesDir: './app',
        storeDir: './src'
    }
};
//# sourceMappingURL=config.js.map