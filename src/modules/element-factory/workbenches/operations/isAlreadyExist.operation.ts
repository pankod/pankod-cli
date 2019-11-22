// #region Global Imports
import * as fs from 'fs';
import * as path from 'path';
// #endregion Global Imports

export const isAlreadyExist = (
    startPath: string = '',
    val: string = '',
    isFile: boolean = false,
    fileType?: string
): boolean => {
    let _path: string;

    switch (fileType) {
        case 'page':
            val = val.replace(/\b\w/g, foo => foo.toLowerCase());
            _path = `${startPath}/${val}`;
            break;
        case 'service':
            val = val.replace(/\b\w/g, foo => foo.toLowerCase());
            _path = `${startPath}/${val}.service.ts`;
            break;
        default:
            val = val.replace(/\b\w/g, foo => foo.toUpperCase());
            _path = isFile ? `${startPath}/${val}.ts` : `${startPath}/${val}`;
            break;
    }

    return fs.existsSync(path.resolve('', _path));
};
