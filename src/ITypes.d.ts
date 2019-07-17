export interface IProjectType {
	cli: {
		projectType: string
	}
}

export interface IText {
	moleculer: string;
	nextjs: string;
}

export interface IQuestion {
	choices: string[];
	message: string;
	name: string;
	type: 'list' | 'confirm';
}

export interface IQuestions {
	moleculer: IQuestion;
	nextjs: IQuestion;
}

export interface IAnswers {
	fileType: string;
}

export interface IQuestionsHelper {
	default: {
		showQuestions: Function
	}
}
