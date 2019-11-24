// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { replaceContent } from '../replaceContent.operation';
import { failsafe } from '../failsafe.operation';
import { operations } from '../../../../utils';
// #endregion Local Imports

describe(operations, () => {
    describe('replaceContent.operation', () => {
        it('should replace regexp matchings with passed contents.', () => {
            const sample = './__temp__/replaceContent/target.ts';

            const sampleContent = '// ! I was just sitting here in silence...';

            failsafe(sample);
            fs.writeFileSync(path.resolve(sample), sampleContent);

            const params = {
                fileDir: sample,
                filetoUpdate: sampleContent,
                regexKey: /\/\/ ! I was just sitting here in silence.../g,
                getFileContent: () => `${sampleContent}\nThen piston dropped!`,
                message: 'replaceContent.operation works!'
            };

            replaceContent(params);

            expect(fs.readFileSync(path.resolve(sample), 'utf8')).toMatchSnapshot();
        });
    });
});
