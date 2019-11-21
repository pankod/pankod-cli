// #region Global Imports
import chalk from 'chalk';
// #endregion Global Imports

type Color = 'bgBlue' | 'bgGreen' | 'bgCyan' | 'bgMagenta';

const { bgBlue, bgGreen, bgCyan, bgMagenta, red, bold, italic } = chalk;

// TODO: Create a better renderer
export const renderMessage = {
    invalidProject: (project: string) => {
        return red(`${bold(project)} is NOT a supported project!`);
    },

    invalidElement: (project: string, element: string) => {
        const [p, e] = [project, element].map(w => bold(w));

        return red(`${p} projects have no element called ${e} to be created!`);
    }
};

export const renderDescription = (
    module: string,
    description: string,
    bgColor: Color = 'bgBlue'
) => {
    return `${chalk[bgColor](bold('[operations]'))} -- ${italic(description)}`;
};

// * Colored Test Descriptions
export const operations = renderDescription('[operations]', 'fs manipulations');

// * Tasks
export const tasks = renderDescription('[tasks]', 'scaffolding');

export const tasksNextjs2 = renderDescription(
    '[tasks > nextjs2]',
    'scaffolding elements',
);
export const tasksNextjs = renderDescription(
    '[tasks > nextjs]',
    'scaffolding elements',
    'bgCyan'
);
export const tasksSvelte = renderDescription(
    '[tasks > svelte]',
    'scaffolding elements',
    'bgGreen'
);
export const tasksMoleculer = renderDescription(
    '[tasks > moleculer]',
    'scaffolding elements',
    'bgMagenta'
);
