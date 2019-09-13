import { IQuestions } from './ITypes';

const questions: IQuestions = {
    moleculer: {
        choices: ['Entity', 'Service'],
        message: 'What would you like to add?',
        name: 'fileType',
        type: 'list'
    },
    nextjs: {
        choices: ['Page', 'Functional Component', 'Class Component', 'Plugin'],
        message: 'What do you want to add?',
        name: 'fileType',
        type: 'list'
    },
    svelte: {
        choices: ['Component'],
        message: 'What do you want to add?',
        name: 'fileType',
        type: 'list'
    },
    nextjs2: {
        choices: ['Page', 'Functional Component'],
        message: 'What do you want to add?',
        name: 'fileType',
        type: 'list'
    }
};

export default questions;
