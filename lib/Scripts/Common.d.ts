import { IPankodConfig } from '../ITypes';
import { ICommon } from './ICommon';
import { Plugins } from './nextjs/pluginsEnum';
export declare const CommonHelper: {
    addToIndex: (params: ICommon.IAddIndex) => void;
    createFile: (dirPath: string) => void;
    getPankodConfig: () => IPankodConfig;
    getTemplate: (templatePath: string, templateProps: ICommon.ITemplateProps) => string;
    hasPlugin: (pluginName: Plugins) => boolean;
    isAlreadyExist: (startPath: string, val?: string, isFile?: boolean, fileType?: string | undefined) => boolean;
    replaceContent: (params: ICommon.IReplaceContent) => void;
    validate: (val: string, dirPath: string, isFile: boolean, fileType: string) => string | boolean;
    writeFile: (params: ICommon.IWriteFile) => void;
};
