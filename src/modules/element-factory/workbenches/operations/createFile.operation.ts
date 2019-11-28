// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

// #region Local Imports
import { failsafe } from '.';
// #endregion Local Imports

export const createFile = (dirPath: string): void => {
    failsafe(dirPath);
    fs.mkdirSync(path.resolve('', dirPath));
};
