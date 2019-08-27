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
            brokerHelperCreate: './lib/Templates/moleculer/Tests/BrokerHelperCreate.mustache',
            brokerHelperImport: './lib/Templates/moleculer/Tests/BrokerHelperImport.mustache',
            createEntityIndexTemplate: './lib/Templates/moleculer/Repositories/EntityIndex.mustache',
            createEntityTemplatePath: './lib/Templates/moleculer/Repositories/Entity.mustache',
            createServiceHelperIndexTemplate: './lib/Templates/moleculer/Services/HelperIndex.mustache',
            createServiceHelperTemplatePath: './lib/Templates/moleculer/Services/Helper.mustache',
            createServiceHelperTestTemplatePath: './lib/Templates/moleculer/Tests/ServiceHelper.mustache',
            createServiceIndexTemplate: './lib/Templates/moleculer/Services/index.mustache',
            createServiceIntegrationTestTemplate: './lib/Templates/moleculer/Tests/IntegrationTest.mustache',
            createServiceTemplatePath: './lib/Templates/moleculer/Services/Service.mustache',
            createServiceTestTemplate: './lib/Templates/moleculer/Tests/Service.mustache',
            createInterfaceFolderIndexTemplate: './lib/Templates/moleculer/Interfaces/FolderIndex.mustache',
            createInterfaceIndexInterfaceTemplate: './lib/Templates/moleculer/Interfaces/index.mustache',
            createInterfaceTemplatePath: './lib/Templates/moleculer/Interfaces',
            createRepositoryIndexTemplate: './lib/Templates/moleculer/Repositories/RepoIndex.mustache',
            createRepositoryTemplatePath: './lib/Templates/moleculer/Repositories/Repository.mustache',
            createRepositoryTestTemplatePath: './lib/Templates/moleculer/Tests/Repository.mustache'
        }
    },
    nextjs: {
        actionDir: './src/Actions',
        compInterfaceDir: './src/Interfaces/Components',
        componentsDir: './src/Components',
        definitionsDir: './src/Definitions',
        filesDir: './files',
        interfaceDir: './src/Interfaces/index.ts',
        mockDir: '/dir',
        mockPagesDir: '/pages',
        mockSrcDir: '/src',
        pageInterfaceDir: './src/Interfaces/Pages',
        pagesDir: './pages',
        reducerDir: './src/Redux/Reducers',
        reduxInterfaceDir: './src/Interfaces/Redux/Store.d.ts',
        routesDir: './app/routes.js',
        storeDir: './src',
        templates: {
            addRouteTemplate: './lib/Templates/nextjs/Routes.mustache',
            compInterfaceIndex: './lib/Templates/nextjs/Interfaces/ComponentIndex.mustache',
            createInterfaceTempPath: './lib/Templates/nextjs/Interfaces/Component.mustache',
            pageInterfaceIndex: './lib/Templates/nextjs/Interfaces/PageIndex.mustache',
            storeImportInterface: './lib/Templates/nextjs/Interfaces/ReduxImport.mustache',
            storeInterface: './lib/Templates/nextjs/Interfaces/ReduxStore.mustache',
            classComponentTemplatePath: './lib/Templates/nextjs/Components/Class.mustache',
            componentIndexTemplatePath: './lib/Templates/nextjs/Components/index.mustache',
            stylePageTemplate: './lib/Templates/nextjs/Styles.mustache',
            funcComponentTemplate: './lib/Templates/nextjs/Components/Functional.mustache',
            reducerIndexTemplatePath: './lib/Templates/nextjs/Reducers/index.mustache',
            reducerTemplatePath: './lib/Templates/nextjs/Reducers/Reducer.mustache',
            actionConstTemplatePath: './lib/Templates/nextjs/Reducers/ActionConst.mustache',
            actionTemplatePath: './lib/Templates/nextjs/Reducers/Action.mustache',
            actionIndexTemplatePath: './lib/Templates/nextjs/Reducers/ActionIndex.mustache',
            reducerStoreTemplatePath: './lib/Templates/nextjs/Reducers/Store.mustache'
        }
    },
    svelte: {
        componentsDir: './src/Components',
        templates: {
            stylePageTemplate: './lib/Templates/svelte/Styles.mustache',
            componentTestTemplate: './lib/Templates/svelte/Tests/Test.mustache',
            componentTemplate: './lib/Templates/svelte/Components/Component.mustache'
        }
    }
};
