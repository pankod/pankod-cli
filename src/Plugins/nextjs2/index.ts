import { INextjs2Plugins } from './INextjs2PluginTypes.d';

import { addSass, addStyled } from './helpers';

const plugins: INextjs2Plugins = {
    sass: addSass,
    styled: addStyled
};

export default {
    addPlugin: async (pluginName: string) => {
        plugins[pluginName]();
    }
};
