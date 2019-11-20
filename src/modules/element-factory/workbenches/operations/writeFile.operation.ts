// #region Local Imports
import * as fs from 'fs';
import * as path from 'path';
import * as logSymbols from 'log-symbols';
// TODO: install chalk
// #endregion Local Imports

export const writeFile = (params: ICommon.IWriteFile) => {
    try {
        fs.writeFileSync(path.resolve('', params.dirPath), params.getFileContent());

        console.info(logSymbols.success, params.message);
    } catch (error) {
        console.error(error);

        process.exit(error);
    }
};
