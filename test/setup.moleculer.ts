import { fs } from 'memfs';
import * as path from 'path';
const realFs = jest.requireActual('fs');

process.chdir('/');

// Create Directories
fs.mkdirSync('/src/Repositories');
fs.mkdirSync('/src/Templates/moleculer');

fs.mkdirSync('/src/Entities');
fs.mkdirSync('/src/ServiceHelpers');

fs.mkdirSync('/src/Interfaces/Repositories');
fs.mkdirSync('/src/Interfaces/Services');

fs.mkdirSync('/services');

fs.mkdirSync('/test/Unit/Repositories');
fs.mkdirSync('/test/Unit/ServiceHelpers');
fs.mkdirSync('/test/Integration');
fs.mkdirSync('/test/Unit/MicroServices');

fs.mkdirSync('/Templates/moleculer');
fs.mkdirSync('/Templates/moleculer/Tests');
fs.mkdirSync('/Templates/moleculer/Services');
fs.mkdirSync('/Templates/moleculer/Repositories');
fs.mkdirSync('/Templates/moleculer/Interfaces');

// Create Templates
fs.writeFileSync('/src/Templates/moleculer/moleculer.mustache', 'Test template moleculer.mustache');

fs.writeFileSync('/app/services/test.service.ts', 'moleculer test service');

fs.writeFileSync('/test/Utils/BrokerHelper.ts', '// #endregion Local Imports');

fs.writeFileSync(
    '/Templates/moleculer/Tests/BrokerHelperImport.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Tests/BrokerHelperImport.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Tests/BrokerHelperCreate.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Tests/BrokerHelperCreate.mustache')
    )
);

fs.writeFileSync('/src/Entities/index.ts', '');
fs.writeFileSync(
    '/Templates/moleculer/Repositories/Entity.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Repositories/Entity.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Repositories/EntityIndex.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Repositories/EntityIndex.mustache')
    )
);

fs.writeFileSync('/src/Repositories/Test.ts', '');
fs.writeFileSync('/test/Unit/Repositories/Test.spec.ts', '');

fs.writeFileSync(
    '/Templates/moleculer/Tests/Repository.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Tests/Repository.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Repositories/RepoIndex.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Repositories/RepoIndex.mustache')
    )
);
fs.writeFileSync(
    '/Templates/moleculer/Repositories/Repository.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Repositories/Repository.mustache')
    )
);

fs.writeFileSync('/src/ServiceHelpers/ServiceHelper.ts', '');

fs.writeFileSync('/test/Unit/ServiceHelper.spec.ts', '');

fs.writeFileSync(
    '/Templates/moleculer/Tests/ServiceHelper.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Tests/ServiceHelper.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Services/Helper.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Services/Helper.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Services/HelperIndex.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Services/HelperIndex.mustache')
    )
);

fs.writeFileSync('/test/Integration/service.spec.ts', '');
fs.writeFileSync('/test/Integration/integration.spec.ts', '');

fs.writeFileSync(
    '/Templates/moleculer/Tests/IntegrationTest.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Tests/IntegrationTest.mustache')
    )
);

fs.writeFileSync('/test/Unit/MicroServices/service.spec.ts', '');

fs.writeFileSync(
    '/Templates/moleculer/Interfaces/Interface.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Interfaces/Interface.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Interfaces/index.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Interfaces/index.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Interfaces/FolderIndex.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Interfaces/FolderIndex.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Interfaces/ServiceInterface.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Interfaces/ServiceInterface.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Services/index.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Services/index.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Services/Service.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Services/Service.mustache')
    )
);

fs.writeFileSync(
    '/Templates/moleculer/Tests/Service.mustache',
    realFs.readFileSync(
        path.resolve(__dirname, '../src/Templates/moleculer/Tests/Service.mustache')
    )
);
