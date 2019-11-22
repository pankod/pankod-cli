// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { operations } from '../../../../utils';
import { addToIndex } from '../addToIndex.operation';
import { getTemplate } from '../getTemplate.operation';
import { ICommon } from '../../../../typings';
// #endregion Local Imports

describe(operations, () => {
    describe('addToIndex.operation', () => {
        it('should append index.ts and match snapshot.', () => {
            const params: ICommon.IAddIndex = {
                dirPath: `__temp__/elements/index.ts`,
                getFileContent: () => {
                    return getTemplate(
                        path.resolve(
                            './lib/Templates/nextjs/Components/index.mustache'
                        ),
                        { fileName: 'Test' }
                    );
                },
                message: 'addToIndex.operation works!'
            };

            addToIndex(params);

            const created = fs.readFileSync(params.dirPath, 'utf8');

            expect(created).toMatchSnapshot();
        });
    });
});
