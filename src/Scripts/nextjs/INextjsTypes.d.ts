import { InputQuestion, Answers, Question, ConfirmQuestion, ListQuestion } from "inquirer";
import { ICommon } from "../ICommon";

export interface INextjsCommonQuestions {
	addStyle: ConfirmQuestion<ICommon.IAnswers>;
	connectStore: ConfirmQuestion<ICommon.IAnswers>;
	enterComponentName: InputQuestion<ICommon.IAnswers>;
	isHaveReducer: ListQuestion<ICommon.IAnswers>;
}

export interface INextjsQuestions {
	ClassComponent: Question<ICommon.IAnswers>[];
	FunctionalComponent: Question<ICommon.IAnswers>[];
	Page: Question<ICommon.IAnswers>[];
	[key: string]: Question<ICommon.IAnswers> | Question<ICommon.IAnswers>[];
}

export interface INextjsActions {
	ClassComponent: Function;
	FunctionalComponent: Function;
	Page: Function;
	AddPlugin: Function;
	[key: string]: Function;
}
