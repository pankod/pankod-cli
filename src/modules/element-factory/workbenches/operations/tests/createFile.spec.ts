// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { createFile } from '../createFile.operation';
import { operations } from '../../../../utils';
// #endregion Local Imports

describe(operations, () => {
    describe('createFile.operation', () => {
        it('should create directory', () => {
            const dirPath = './__temp__/createFileOperation/generated/this';

            createFile(dirPath);

            const isExist = fs.existsSync(path.resolve(dirPath));

            expect(isExist).toBeTruthy();
        });
    });
});
