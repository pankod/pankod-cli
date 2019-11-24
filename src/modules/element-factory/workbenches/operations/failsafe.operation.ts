// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

export const failsafe = (target: string) => {

    const folders = path
        .resolve(target)
        .split('/')
        .splice(1);

    // * If ends with trailing slash, last folder
    // * will be created too.
    target.match(/\/$/) && folders.push('');

    folders.reduce((acc: string[], curr: string) => {

        const target = path.join(...acc);

        if (!fs.existsSync(target)) fs.mkdirSync(target)

        return [...acc, curr];
    }, ['/']);
};
