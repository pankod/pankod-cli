"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #region Global Imports
const fs = require("fs");
const path = require("path");
// #endregion Global Imports
// #region Local Imports
const utils_1 = require("../../../../utils");
const addToIndex_operation_1 = require("../addToIndex.operation");
const getTemplate_operation_1 = require("../getTemplate.operation");
// #endregion Local Imports
describe(utils_1.operations, () => {
    describe('addToIndex.operation', () => {
        it('should append index.ts and match snapshot.', () => {
            const params = {
                dirPath: `__temp__/elements/index.ts`,
                getFileContent: () => {
                    return getTemplate_operation_1.getTemplate(path.resolve('./lib/Templates/nextjs/Components/index.mustache'), { fileName: 'Test' });
                },
                message: 'addToIndex.operation works!'
            };
            addToIndex_operation_1.addToIndex(params);
            const created = fs.readFileSync(params.dirPath, 'utf8');
            expect(created).toMatchSnapshot();
        });
    });
});
