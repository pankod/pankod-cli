export declare namespace ICommon {
    export type ElementType = 'Page' | 'ClassComponent' | 'FunctionalComponent' | 'Plugin';
    
    export interface ITemplateProps {
        fileName?: string;
        upperFileName?: string;
        isPrivate?: boolean;
        lowerFileName?: string;
        interfaceName?: string;
    }

    export interface IAnswers {
        target?: string;
        isClass?: boolean;
        fileName: string;
        fileType?: string;
        interfaceName?: string;
        classDir?: string;
        upperFileName?: string;
        isPrivate?: boolean;
        hasDatabase?: boolean;
        hasPath?: boolean;
        routePath?: string;
        lowerFileName?: string;
        isPage?: boolean;
        isConnectStore?: boolean;
        hasStyle?: string | boolean;
        pluginType?: string;
        isStyled?: boolean;
        isScss?: boolean;
        isFuncComponent?: boolean;
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
