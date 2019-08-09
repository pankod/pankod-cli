"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const fs = require("fs");
const logSymbols = require("log-symbols");
const mustache = require("mustache");
const path = require("path");
//#endregion Local Imports
exports.CommonHelper = {
    addToIndex: (params) => {
        fs.appendFileSync(path.resolve('', params.dirPath), `${params.getFileContent()}`);
        console.log(logSymbols.success, params.message);
    },
    createFile: (dirPath) => {
        fs.mkdirSync(path.resolve('', dirPath));
    },
    getPankodConfig: () => {
        const config = JSON.parse(String(fs.readFileSync('./package.json')));
        return config.pankod;
    },
    getTemplate: (templatePath, templateProps) => 
    // __dirname + ../../ path is root of the lib folder.
    mustache.render(fs.readFileSync(path.resolve(__dirname, '../../', templatePath), 'utf8'), templateProps),
    hasPlugin: (pluginName) => {
        const plugins = exports.CommonHelper.getPankodConfig().plugins;
        return plugins.includes(pluginName);
    },
    isAlreadyExist: (startPath, val = '', isFile = false, fileType) => {
        let _path;
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
    },
    replaceContent: (params) => {
        const replaceFile = params.filetoUpdate.replace(params.regexKey, params.getFileContent());
        const writeFileProps = {
            dirPath: params.fileDir,
            getFileContent: () => replaceFile,
            message: params.message
        };
        exports.CommonHelper.writeFile(writeFileProps);
    },
    validate: (val, dirPath, isFile, fileType) => {
        if (val.length) {
            if (exports.CommonHelper.isAlreadyExist(dirPath, val, isFile, fileType)) {
                return `This ${fileType} name already used before, enter new name.`;
            }
            return true;
        }
        return 'Can not be empty';
    },
    writeFile: (params) => {
        try {
            fs.writeFileSync(path.resolve('', params.dirPath), params.getFileContent());
            console.info(logSymbols.success, params.message);
        }
        catch (error) {
            console.error(error);
            process.exit(error);
        }
    }
};
