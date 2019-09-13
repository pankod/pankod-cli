import { INextjsPlugins } from './INextjsPluginTypes';

export const addStyled = () => {
    console.log('adding styled...');
};

export const addSass = () => {
    console.log('adding sass...');
};

export const PluginHelper: INextjsPlugins = {
    sass: addSass,
    styled: addStyled
};
