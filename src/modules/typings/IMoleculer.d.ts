// #region Global Imports
import { Question } from "inquirer";
// #region Global Imports

// #region Local Imports
import { ICommon } from ".";
// #region Local Imports

export type MoleculerElement = 'service' | 'repository';

export interface IMoleculerQuestions {
    entity: Question<ICommon.IAnswers>[];
    service: Question<ICommon.IAnswers>[];
    [key: string]: Question<ICommon.IAnswers> | Question<ICommon.IAnswers>[];
}

export interface IMoleculerActions {
    entity: Function;
    service: Function;
    [key: string]: Function;
}

export declare namespace IMoleculerHelper {
	export interface IBrokerHelperTemplatesParams {
		replaceFileDir: string;
		brokerHelperImport: string;
		brokerHelperCreate: string;
	}

	export interface ICreateEntityHelperParams {
		templatePath: string;
		indexTemplate: string;
	}
	export interface ICreateServiceParams {
		templatePath: string;
		indexTemplate: string;
		testTemplatePath: string;
		integrationTemplatePath: string;
		brokerHelperTemplatesParams: IBrokerHelperTemplatesParams;
		createServiceHelperParams: ICreateServiceHelperParams;
		createInterfaceParams: ICreateInterfaceParams;
	}
	export interface ICreateServiceHelperParams {
		templatePath: string;
		indexTemplate: string;
		testTemplatePath: string;
	}

	export interface ICreateRepositoryParams {
		templatePath: string;
		indexTemplate: string;
		testTemplatePath: string;
		createInterfaceParams: ICreateInterfaceParams;
		createEntityTemplatesParams: ICreateEntityHelperParams;
	}

	export interface ICreateInterfaceParams {
		templatePath: string;
		indexInterfaceTemplate: string;
		folderIndexTemplate: string;
	}
}
