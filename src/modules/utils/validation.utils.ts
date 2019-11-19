
// TODO: Refactor properly
export const validateProjectSupported = (projectType: string) => {
    if (!Object.keys(choices).includes(projectType)) {
        this.error(`The project ${projectType} isn't supported.`);
    }
};

export const validateCommand = (element: string, projectType: string) => {
    if (element && !choices[projectType].includes(element)) {
        this.error(`Command "${element}" isn't supported by ${projectType} project.`);
    }
};
