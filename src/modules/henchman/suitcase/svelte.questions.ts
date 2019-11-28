// #region Local Imports
import * as questions from './questions/svelte';
import { ISvelteQuestions } from '../../typings';
// #endregion Local Imports

export const svelte: ISvelteQuestions = {
    Component: [
        questions.componentName,
        questions.hasStyle
    ]
};
