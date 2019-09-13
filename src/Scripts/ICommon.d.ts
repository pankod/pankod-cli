
export declare namespace ICommon {
    export interface ITemplateProps {
        fileName?: string;
        upperFileName?: string;
        isPrivate?: boolean;
		lowerFileName?: string;
		interfaceName?: string;
    }

    export interface IAnswers {
        fileName: string;
        fileType?: string;
        upperFileName?: string;
        isPrivate?: boolean;
        hasDatabase?: boolean;
        hasPath?: boolean;
        routePath?: string;
        lowerFileName?: string;
        isPage?: boolean;
        isConnectStore?: boolean;
        hasStyle?: string;
        pluginType?: string;
        isStyled?:boolean;
        isScss?:boolean;
    }

    export interface IAddIndex {
        dirPath: string;
        getFileContent: Function;
        message: string;
    }

    export interface IAddTest {
        dirPath: string;
        getFileContent: Function;
        message: string;
    }

    export interface IWriteFile {
        dirPath: string;
        getFileContent: Function;
        message: string;
    }

    export interface ICreateTest {
        templatePath: string;
        templateProps: ITemplateProps;
        answers: IAnswers;
        dirPath: string;
        successMessage: string;
    }

    export interface IReplaceContent {
        filetoUpdate: string;
        fileDir: string;
        regexKey: RegExp;
        message: string;
        getFileContent(): string;
    }
}
