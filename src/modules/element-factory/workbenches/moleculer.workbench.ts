// #region Local Imports
import * as tasks from './tasks';
import { ICommon, MoleculerElement, IMoleculerActions } from '../../typings';
// #endregion Local Imports

export const moleculer = (element: MoleculerElement, options: ICommon.IAnswers) => {
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
