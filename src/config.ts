export const Config = {
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
			brokerHelperImport: './dist/Templates/moleculer/Tests/BrokerHelperImport.mustache'
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
