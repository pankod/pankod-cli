// #region Global Imports
import chalk from 'chalk';
// #endregion Global Imports

// TODO: Create a better renderer
export const renderMessage = {
    invalidProject: (project: string) => {
        return `${chalk.bold(project)} is NOT a supported project!`;
    },

    invalidElement: (project: string, element: string) => {
        const [p, e] = [project, element].map(w => chalk.bold(w));

        return chalk.red(
            `${p} projects have no element called ${e} to be created!`
        );
    }
};
