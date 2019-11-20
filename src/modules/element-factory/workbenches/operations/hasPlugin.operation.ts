// #region Local Imports
import * as operations from '.';
// #endregion Local Imports

export const hasPlugin = (pluginName: string): boolean => {
    const plugins: string[] = operations.getPankodConfig().plugins;

    return plugins.includes(pluginName);
};
