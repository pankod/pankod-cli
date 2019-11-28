import { INextjs2Plugins } from './INextjs2PluginTypes';

export const addStyled = () => {
    console.log('adding styled...');
};

export const addSass = () => {
    console.log('adding sass...');
};

export const PluginHelper: INextjs2Plugins = {
    sass: addSass,
    styled: addStyled
};
