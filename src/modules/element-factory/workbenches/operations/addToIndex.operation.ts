// #region Local Imports
import * as fs from 'fs';
import * as path from 'path';
import * as logSymbols from 'log-symbols';
// TODO: install chalk
// #endregion Local Imports

export const addToIndex = (params: ICommon.IAddIndex): void => {
    fs.appendFileSync(path.resolve('', params.dirPath), `${params.getFileContent()}`);

    console.log(logSymbols.success, params.message);
};
