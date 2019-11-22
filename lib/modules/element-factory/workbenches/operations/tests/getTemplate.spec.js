"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const path = require("path");
const chalk_1 = require("chalk");
const logSymbols = require("log-symbols");
// #endregion Global Imports
// #region Local Imports
const utils_1 = require("../../../../utils");
const getTemplate_operation_1 = require("../getTemplate.operation");
// #endregion Local Imports
describe(utils_1.operations, () => {
    describe('getTemplate.operation', () => {
        const existent = './lib/Templates/nextjs/Components/index.mustache';
        const nonExistent = './non-existent/non-existent.mustache';
        const render = (template) => {
            getTemplate_operation_1.getTemplate(path.resolve(template), { fileName: 'Test' });
        };
        it('should template with passed model', () => {
            expect(render(existent)).toMatchSnapshot();
        });
        it('should log error if given path is non-existent', () => {
            try {
                render(nonExistent);
            }
            catch (error) {
                console.info(chalk_1.default.green(logSymbols.success, 'getTemplate.operation works!'));
                expect(error).toBeDefined();
            }
        });
    });
});
