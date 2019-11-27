// #region Global Imports
import * as path from 'path';
import chalk from 'chalk';
import * as logSymbols from 'log-symbols';
// #endregion Global Imports

// #region Local Imports
import { operations } from '../../../../utils';
import { getTemplate } from '../getTemplate.operation';
import { writeFile } from '../writeFile.operation';
import { failsafe } from '../failsafe.operation';
// #endregion Local Imports

const realFS = jest.requireActual('fs');

describe(operations, () => {
    const existent = './lib/Templates/nextjs/Components/index.mustache';
    const nonExistent = './non-existent/non-existent.mustache';

    beforeAll(() => {
        failsafe(existent);
        writeFile({
            dirPath: existent,
            getFileContent: () => realFS.readFileSync(existent, 'utf-8'),
            message: 'Component index created into memory.'
        });
    });

    describe('getTemplate.operation', () => {
        const render = (template: string) => {
            return getTemplate(path.resolve(template), { fileName: 'Test' });
        };

        it('should template with passed model', () => {
            expect(render(existent)).toMatchInlineSnapshot(`
                "export { default as Test } from '@Components/Test';
                "
            `);
        });

        it('should log error if given path is non-existent', () => {
            try {
                render(nonExistent);
            } catch (error) {
                console.info(
                    chalk.green(
                        logSymbols.success,
                        'getTemplate.operation works!'
                    )
                );
                expect(error).toBeDefined();
            }
        });
    });
});
