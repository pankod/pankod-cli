import { InputQuestion, Answers, Question, ConfirmQuestion, ListQuestion } from "inquirer";
import { ICommon } from "../ICommon";

export interface INextjsCommonQuestions {
	addStyle: ConfirmQuestion<ICommon.IAnswers>;
	connectStore: ConfirmQuestion<ICommon.IAnswers>;
	enterComponentName: InputQuestion<ICommon.IAnswers>;
	isHaveReducer: ListQuestion<ICommon.IAnswers>;
}

export interface INextjsQuestions {
	class: Question<ICommon.IAnswers>[];
	functional: Question<ICommon.IAnswers>[];
	page: Question<ICommon.IAnswers>[];
	[key: string]: Question<ICommon.IAnswers> | Question<ICommon.IAnswers>[];
}

export interface INextjsActions {
	class: Function;
	functional: Function;
	page: Function;
	[key: string]: Function;
}
