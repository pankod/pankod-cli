// #region Local Imports
import * as fs from 'fs';
// #endregion Local Imports

export const getPankodConfig = (): IPankodConfig => {
    const config = JSON.parse(String(fs.readFileSync('./package.json'))) as {
        pankod: IPankodConfig;
    };

    return config.pankod;
};
