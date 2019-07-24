import { IMoleculerActions } from './IMoleculerTypes.d';
import { InputQuestion, Answers, Question } from "inquirer";
import { ICommon } from "../ICommon";

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

export declare module IMoleculerHelper {
	export interface IBrokerHelperTemplatesParams {
		replaceFileDir: string;
		brokerHelperImport: string;
		brokerHelperCreate: string;
	}

	export interface ICreateEntityHelperParams {
		templatePath: string;
		indexTemplate: string;
	}
	export interface ICreateServiceHelperParams {
		templatePath: string;
		indexTemplate: string;
		testTemplatePath: string;
	}
}
