//#region Global Imports
import * as fs from 'fs';
import * as logSymbols from 'log-symbols';
import * as mustache from 'mustache';
import * as path from 'path';
//#endregion Global Imports

//#region Local Imports
import { ICommon } from './ICommon';
//#endregion Local Imports

export const CommonHelper = {
	addToIndex: (params: ICommon.IAddIndex): void => {
		fs.appendFile(
			path.resolve('', params.dirPath),
			`${params.getFileContent()}\n`,
			err => {
				if (err) throw err;
				console.log(logSymbols.success, params.message);
			}
		);
	},
	createFile: (dirPath: string): void => {
		fs.mkdirSync(path.resolve('', dirPath));
	},
	getTemplate: (templatePath: string, templateProps: ICommon.ITemplateProps): string => (

		// __dirname + ../../ path is root of the dist folder.
		mustache.render(
			fs.readFileSync(path.resolve(__dirname, '../../', templatePath), 'utf8'),
			templateProps
		)
	),
	isAlreadyExist: (startPath: string, val: string = '', isFile: boolean = false, fileType?: string): boolean => {
		let _path: string;

		switch (fileType) {
			case 'page':
				val = val.replace(/\b\w/g, foo => foo.toLowerCase());
				_path = isFile ? `${startPath}/${val}.ts` : `${startPath}/${val}`;
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
	},
	replaceContent: (params: ICommon.IReplaceContent): void => {
		const replaceFile = params.filetoUpdate.replace(params.regexKey, params.getFileContent());

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: params.fileDir,
			getFileContent: () => replaceFile,
			message: params.message
		};

		CommonHelper.writeFile(writeFileProps);
	},
	writeFile: (params: ICommon.IWriteFile) => {
		fs.writeFile(
			path.resolve('', params.dirPath),
			params.getFileContent(),
			err => {
				if (err) throw err;
				console.log(logSymbols.success, params.message);
			}
		);
	},

	validate: (val: string, dirPath: string, isFile: boolean, fileType: string): string | boolean => {

		if (val.length) {
			if (
				CommonHelper.isAlreadyExist(
					dirPath,
					val,
					isFile,
					fileType
				)
			) {
				return `This ${fileType} name already used before, enter new name.`;
			}

			return true;
		}

		return 'Can not be empty';
	}
};
