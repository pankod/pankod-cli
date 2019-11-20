// #region Local Imports
import * as tasks from './tasks';
// #endregion Local Imports

export const moleculer = (element: string, options: ICommon.IAnswers) => {
    const workbench: IMoleculerActions = {
        entity: () => {
            tasks.createRepository(options);
        },

        service: () => {
            tasks.createService(options);
        }
    };

    workbench[element]();
};
