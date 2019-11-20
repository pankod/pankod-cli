// #region Local Imports
import * as suitcase from '../henchman/suitcase';
import { ICommon } from '../typings';
import { renderMessage } from '.';
// #endregion Local Imports

// TODO: bind this or what ?
export const validateProject = (project: string) => {
    if (!suitcase.hasOwnProperty(project)) {
        this.error(renderMessage.invalidProject(project));
    }
};

export const validateCommand = (
    element: ICommon.Element,
    project: ICommon.Project
) => {
    if (!suitcase[project].hasOwnProperty(element)) {
        this.error(renderMessage.invalidElement(project, element));
    }
};

export const getAllElements = () => {
    return Object.keys(Object.assign({}, ...Object.values(suitcase)));
};

export const getUsage = () => getAllElements().map(e => `add ${e}`);
