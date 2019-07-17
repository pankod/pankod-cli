import { InputQuestion, Answers, Question } from "inquirer";
import { IAnswers } from "../../ITypes";

export interface IMoleculerQuestions {
	entity: Question<IAnswers>[];
	service: Question<IAnswers>[];
	[key: string]: Question<IAnswers> | Question<IAnswers>[];
}

export interface IMoleculerActions {
	entity: Function;
	service: Function;
	[key: string]: Function;
}
