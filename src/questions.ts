import { Questions } from 'inquirer';
import { ICommon } from './Scripts/ICommon';

interface ChoicesObject {
    [projectType: string]: string[];
}

export const choices: ChoicesObject = {
    moleculer: ['Entity', 'Service'],
    nextjs: ['Page', 'Functional Component', 'Class Component', 'Plugin'],
    svelte: ['Component'],
    nextjs2: ['Page', 'Functional Component']
};

export const getQuestionByProjectType = (projectType: string): Questions<ICommon.IAnswers> => ({
    choices: choices[projectType],
    message: 'What would you like to add?',
    name: 'fileType',
    type: 'list'
});
