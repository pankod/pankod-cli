// #region Global Imports
import * as fs from 'fs';
// #region Global Imports

// #region Local Imports
import { IPankodConfig } from '../typings';
// #endregion Local Imports

export const getPankodConfig = (): IPankodConfig => {
    const config = JSON.parse(String(fs.readFileSync('./package.json'))) as {
        pankod: IPankodConfig;
    };

    return config.pankod;
};

export const hasPlugin = (pluginName: string): boolean => {
    const plugins: string[] = getPankodConfig().plugins;

    return plugins.includes(pluginName);
};
