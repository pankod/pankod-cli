// #region Global Imports
import * as path from 'path';
import chalk from 'chalk';
import * as logSymbols from 'log-symbols';
// #endregion Global Imports

// #region Local Imports
import { operations } from '../../../../utils';
import { getTemplate } from '../getTemplate.operation';
// #endregion Local Imports

describe(operations, () => {
    describe('getTemplate.operation', () => {
        const existent = './lib/Templates/nextjs/Components/index.mustache';
        const nonExistent = './non-existent/non-existent.mustache';

        const render = (template: string) => {
            getTemplate(path.resolve(template), { fileName: 'Test' });
        };

        it('should template with passed model', () => {
            expect(render(existent)).toMatchSnapshot();
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
