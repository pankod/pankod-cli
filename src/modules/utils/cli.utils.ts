// #region Local Imports
import * as suitcase from '../henchman/suitcase';
import { ICommon } from '../typings';
import { renderMessage } from '.';
// #endregion Local Imports

export const validateProject = function(this: any, project: string) {
    if (!suitcase.hasOwnProperty(project)) {
        this.error(renderMessage.invalidProject(project));
    }
};

export const validateCommand = function(
    this: any,
    element: ICommon.Element,
    project: ICommon.Project
) {
    if (!suitcase[project].hasOwnProperty(element)) {
        this.error(renderMessage.invalidElement(project, element));
    }
};
