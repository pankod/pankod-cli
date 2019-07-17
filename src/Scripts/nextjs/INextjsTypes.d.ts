import { InputQuestion, Answers, Question, ConfirmQuestion, ListQuestion } from "inquirer";
import { IAnswers } from '../../ITypes'

export interface INextjsCommonQuestions {
	addStyle: ConfirmQuestion<IAnswers>;
	connectStore: ConfirmQuestion<IAnswers>;
	enterComponentName: InputQuestion<IAnswers>;
	isHaveReducer: ListQuestion<IAnswers>;
}

export interface INextjsQuestions {
	class: Question<IAnswers>[];
	functional: Question<IAnswers>[];
	page: Question<IAnswers>[];
	[key: string]: Question<IAnswers> | Question<IAnswers>[];
}

export interface INextjsActions {
	class: Function;
	functional: Function;
	page: Function;
	[key: string]: Function;
}
