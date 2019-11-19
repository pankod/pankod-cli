// #region Local Imports
// TODO: import helpers and types ...and you know
// #endregion Local Imports

export const moleculer = (element: string, options: ICommon.IAnswers) => {
    const workbench: IMoleculerActions = {
        entity: () => {
            Helpers.createRepository(options);
        },

        service: () => {
            Helpers.createService(options);
        }
    };

    workbench[element]();
};
