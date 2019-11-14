import { Helper } from './helper';
import { ICommon } from '../ICommon';
import { INextjs2Actions } from './INextjs2Types';
import { PluginHelper } from '../../Plugins/nextjs/helpers';

const prepareOptions = (answers: ICommon.IAnswers, custom?: object) => {
    const capitalizedName = answers.fileName.replace(/\b\w/g, f => f.toUpperCase());
    const unCapitalizedName = answers.fileName.replace(/\b\w/g, f => f.toLowerCase());

    return {
        ...answers,
        fileName: capitalizedName,
        // TODO: Rename 'upperFileName' as 'capitalizedFileName'
        upperFileName: capitalizedName,
        lowerFileName: unCapitalizedName,
        interfaceName: `I${capitalizedName}`,
        ...custom
    };
};

export const createElement = (elementType: ICommon.ElementType, answers: ICommon.IAnswers) => {
    const options = prepareOptions(answers);

    const factory: INextjs2Actions = {
        Page: () => {
            Helper.createClassComponent({ ...options, isPage: true });
        },

        ClassComponent: () => {
            Helper.createClassComponent(options);
        },

        FunctionalComponent: () => {
            Helper.createFuncComponent({ ...options, isFuncComponent: true });
        },

        Plugin: () => {
            if (answers.pluginType) PluginHelper[answers.pluginType]();
        }
    };

    factory[elementType]();
};
