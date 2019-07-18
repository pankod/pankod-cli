import { INextjsPlugins } from './INextjsPluginTypes';
import { addSass, addStyled } from './helpers';

const plugins: INextjsPlugins = {
	sass: addSass,
	styled: addStyled
};

export default {
	addPlugin: async (pluginName: string) => {
		plugins[pluginName]();
	}
};
