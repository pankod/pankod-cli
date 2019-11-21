import * as path from "path"
import * as fs from 'fs';

import { operations } from '../../../../utils';
import { addToIndex } from '../addToIndex.operation';
import { getTemplate } from '../getTemplate.operation';
import { ICommon } from '../../../../typings';

describe(operations, () => {
    describe('addToIndex.operation', () => {
        const params: ICommon.IAddIndex = {
            dirPath: `__temp__/elements/index.ts`,
            getFileContent: () => {
                return getTemplate(
                    path.resolve('./lib/Templates/nextjs/Components/index.mustache'),
                    { fileName: 'Test' }
                );
            },
            message: 'Entity added to index.ts.'
        };

        addToIndex(params);

        const created = String(fs.readFileSync(params.dirPath));

        test('should pass', () => {
            expect(created).toMatchSnapshot();
        });
    });
});
