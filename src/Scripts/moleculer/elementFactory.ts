// #region Local Imports
import { IMoleculerActions } from './IMoleculerTypes';
import { ICommon } from '../ICommon';
import * as Helpers from './Helpers';
// #endregion Local Imports

const prepareOptions = (answers: ICommon.IAnswers) => {
    const capitalizedName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
    const uncapitalizedName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());

    return {
        ...answers,
        fileName: capitalizedName,
        upperFileName: capitalizedName,
        lowerFileName: uncapitalizedName
    };
};

export const createElement = (elementType: string, answers: ICommon.IAnswers) => {
    const options = prepareOptions(answers);

    const factory: IMoleculerActions = {
        entity: () => Helpers.createRepository(options),
        service: () => Helpers.createService(options)
    };

    factory[elementType]();
};
