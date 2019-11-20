// #region Local Imports
import { Next2Element, NextElement, SvelteElement, MoleculerElement } from '.';
// #region Local Imports

// TODO: Seperate operations params' types
// TODO: IAnswer and IElement should be kept in their own workbenches.

export declare namespace ICommon {
    export type Project = 'nextjs2' | 'nextjs' | 'svelte' | 'moleculer';
    export type Element = Next2Element &
        NextElement &
        SvelteElement &
        MoleculerElement;

    export interface IAddArgs  {
        args: {
            element: Element;
        }
    }

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
