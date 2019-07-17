"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = {
    moleculer: {
        repositoriesDir: './src/Repositories',
        entityDir: './src/Entities',
        repositoriesTestDir: './test/Unit/Repositories',
        servicesDir: './services',
        servicesHelperDir: './src/ServiceHelpers',
        servicesTestDir: './test/Unit/MicroServices',
        integrationTestDir: './test/Integration',
        interfaceDir: './src/Interfaces',
        serviceHelperTestDir: './test/Unit/ServiceHelpers',
        brokerHelper: './test/Utils/BrokerHelper.ts',
    },
    nextjs: {
        filesDir: './files',
        mockDir: '/dir',
        mockSrcDir: '/src',
        mockPagesDir: '/pages',
        interfaceDir: './src/Interfaces',
        compInterfaceDir: './src/Interfaces/Components',
        pageInterfaceDir: './src/Interfaces/Pages',
        reduxInterfaceDir: './src/Interfaces/Redux',
        componentsDir: './src/Components',
        definitionsDir: './src/Definitions',
        pagesDir: './pages',
        reducerDir: './src/Redux/Reducers',
        actionDir: './src/Actions',
        routesDir: './app',
        storeDir: './src'
    }
};
//# sourceMappingURL=config.js.map