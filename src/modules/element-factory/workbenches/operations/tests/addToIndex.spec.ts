// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { operations } from '../../../../utils';
import { addToIndex } from '../addToIndex.operation';
import { getTemplate } from '../getTemplate.operation';
import { ICommon } from '../../../../typings';
import { writeFile } from '../writeFile.operation';
import { failsafe } from '../failsafe.operation';
// #endregion Local Imports

const realFS = jest.requireActual('fs');

describe(operations, () => {
    describe('addToIndex.operation', () => {
        const templatePath = './lib/Templates/nextjs/Components/index.mustache';

        beforeAll(() => {
            failsafe(templatePath);
            writeFile({
                dirPath: templatePath,
                getFileContent: () => realFS.readFileSync(templatePath),
                message: 'Component index created into memory.'
            });
        });

        it('should append index.ts and match snapshot.', () => {
            const params: ICommon.IAddIndex = {
                dirPath: `./__temp__/elements/index.ts`,
                getFileContent: () => {
                    return getTemplate(path.resolve(templatePath), {
                        fileName: 'Test'
                    });
                },
                message: 'addToIndex.operation works!'
            };

            addToIndex(params);

            const created = fs.readFileSync(params.dirPath, 'utf8');

            expect(created).toMatchSnapshot();
        });
    });
});
