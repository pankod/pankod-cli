// #region Global Imports
import { red, bold } from 'chalk';
// #endregion Global Imports

// TODO: Create a better renderer
export const renderMessage = {
    invalidProject: (project: string) => {
        return `${bold(project)} is NOT a supported project!`;
    },

    invalidElement: (project: string, element: string) => {
        const [p, e] = [project, element].map(bold);

        return red(`${p} projects have no element called ${e} to be created!`);
    }
};
