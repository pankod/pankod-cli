import { ConfirmQuestion, ListQuestion } from "inquirer";

export interface IProjectType {
	cli: {
		projectType: string
	}
}

export interface IText {
	moleculer: string;
	nextjs: string;
	[key: string]: string;
}

export interface IQuestions {
	moleculer: ListQuestion<IAnswers>;
	nextjs: ListQuestion<IAnswers>;
	[key: string]: ListQuestion<IAnswers>;
}

export interface IAnswers {
	fileType: string;
	fileName: string;
	isHavePath: boolean;
	isConnectStore: boolean;
}

export interface IQuestionsHelper {
	default: {
		showQuestions: Function
	}
}
