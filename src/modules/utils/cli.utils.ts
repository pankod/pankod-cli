// #region Local Imports
import * as suitcase from '../henchman/suitcase';
import { ICommon } from '../typings';
// #endregion Local Imports

export const validateProject = (project: string) => {
    if (!suitcase.hasOwnProperty(project)) {
        this.error(`The project ${project} isn't supported.`);
    }
};

export const validateCommand = (element: ICommon.Element, project: ICommon.Project) => {
    if (!suitcase[project].hasOwnProperty(element)) {
        this.error(`Command "${element}" isn't supported by ${project} project.`);
    }
};
