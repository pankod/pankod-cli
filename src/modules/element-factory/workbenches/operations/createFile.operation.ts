// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

export const createFile = (dirPath: string): void => {
    fs.mkdirSync(path.resolve('', dirPath));
};
