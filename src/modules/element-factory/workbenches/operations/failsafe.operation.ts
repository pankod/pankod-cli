// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

export const failsafe = (target: string) => {
    const folders = target.split('/');

    folders.reduce(
        (acc, curr) => {
            // * NOTICE: Last portion of path will be created
            // * only if target has a trailing slash
            // * .../stairway/to/heaven  (no heaven)
            // * .../stairway/to/heaven/ (now we have a heaven)
            const target = path.join(...acc);

            if (!fs.existsSync(target)) fs.mkdirSync(target);

            return [...acc, curr];
        },
        ['.']
    );
};
