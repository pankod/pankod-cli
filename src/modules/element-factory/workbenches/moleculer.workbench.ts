// #region Local Imports
import { createRepository, createService } from './tasks/moleculer';
import { ICommon, MoleculerElement, IMoleculerActions } from '../../typings';
// #endregion Local Imports

export const moleculer = (
    // TODO: infer to MoleculerElement to supress can't assign to 'never'
    // * passing as Element temporarily
    // element: MoleculerElement,
    element: ICommon.Element,
    options: ICommon.IAnswers
) => {
    const workbench: IMoleculerActions = {
        Repository: () => {
            createRepository(options);
        },

        Service: () => {
            createService(options);
        }
    };

    workbench[element]();
};
