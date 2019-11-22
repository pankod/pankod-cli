import { fs } from 'memfs';
// import { failsafe } from './src/modules/element-factory/workbenches/operations/failsafe.operation';

jest.mock('fs', () => require('memfs'));
