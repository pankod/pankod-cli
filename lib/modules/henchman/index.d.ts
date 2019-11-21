import * as inquirer from 'inquirer';
import { ICommon } from '../typings';
export declare const getAllQuestionsAsObject: () => any;
export declare const getAllElements: () => string[];
export declare const getUsage: () => string[];
export declare const getQuestionsOfProjectElement: (project: ICommon.Project, element: ICommon.Element) => inquirer.ListQuestion<ICommon.IAnswers> | inquirer.RawListQuestion<ICommon.IAnswers> | inquirer.ExpandQuestion<ICommon.IAnswers> | inquirer.CheckboxQuestion<ICommon.IAnswers> | inquirer.ConfirmQuestion<ICommon.IAnswers> | inquirer.InputQuestion<ICommon.IAnswers> | inquirer.NumberQuestion<ICommon.IAnswers> | inquirer.PasswordQuestion<ICommon.IAnswers> | inquirer.EditorQuestion<ICommon.IAnswers> | (inquirer.ListQuestion<ICommon.IAnswers> | inquirer.RawListQuestion<ICommon.IAnswers> | inquirer.ExpandQuestion<ICommon.IAnswers> | inquirer.CheckboxQuestion<ICommon.IAnswers> | inquirer.ConfirmQuestion<ICommon.IAnswers> | inquirer.InputQuestion<ICommon.IAnswers> | inquirer.NumberQuestion<ICommon.IAnswers> | inquirer.PasswordQuestion<ICommon.IAnswers> | inquirer.EditorQuestion<ICommon.IAnswers>)[];
export declare const getQuestionByProject: (project: ICommon.Project) => inquirer.Questions<ICommon.IAnswers>;
