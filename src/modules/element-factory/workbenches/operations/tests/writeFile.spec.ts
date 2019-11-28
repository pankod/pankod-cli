// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { operations } from '../../../../utils';
import { writeFile } from '../writeFile.operation';
// #endregion Local Imports

describe(operations, () => {
    describe('writeFile.operation', () => {
        it('should create file with passed contents.', () => {
            const params = {
                dirPath: './__temp__/writeFileOperation/wrote/this-just.now',
                getFileContent: () => '// * writeFile.operation created this!',
                message: 'writeFile.operation works!'
            };

            writeFile(params);

            const content = fs.readFileSync(path.resolve(params.dirPath), 'utf8');

            expect(content).toBeDefined();
            expect(content).toBe(params.getFileContent());
        });
    });
});
