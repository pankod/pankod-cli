// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { operations } from '../../../../utils';
import { isAlreadyExist } from '../isAlreadyExist.operation';
import { failsafe } from '../failsafe.operation';
// #endregion Local Imports

describe(operations, () => {
    describe('isAlreadyExist.operation', () => {
        const startPath = '__temp__/isAlreadyExist/agrees/';

        // * Creates directories and files for truthy samples
        beforeAll(() => {
            const sampleFolders = ['sample/', 'default_isFileFalse/'];

            const sampleFiles = ['sample.service.ts', 'default_isFileTrue.ts'];

            failsafe(startPath);

            sampleFolders.forEach(folder => {
                fs.mkdirSync(path.resolve(startPath, folder));
            });

            sampleFiles.forEach(file => {
                fs.writeFileSync(path.resolve(startPath, file), '');
            });
        });

        const subjects = [
            {
                startPath,
                val: 'sample',
                isFile: false,
                fileType: 'page'
            },
            {
                startPath,
                val: 'sample',
                isFile: false,
                fileType: 'service'
            },
            {
                startPath,
                val: 'default_isFileTrue',
                isFile: true,
                fileType: 'default'
            },
            {
                startPath,
                val: 'default_isFileFalse',
                isFile: false,
                fileType: 'default'
            }
        ];

        describe('checks existence and returns boolean', () => {
            it('should agree on existence', () => {
                subjects.forEach(({ startPath, ...rest }) => {
                    expect(
                        isAlreadyExist(startPath, ...Object.values(rest))
                    ).toBeTruthy();
                });
            });

            it('should deny existence', () => {
                subjects
                    .map(s => ({ ...s, val: `${s.val}_notExistent` }))
                    .forEach(({ startPath, ...rest }) => {
                        expect(
                            isAlreadyExist(startPath, ...Object.values(rest))
                        ).toBeFalsy();
                    });
            });
        });
    });
});
