import mergePlugins from './mergePlugins';
import { validateApiVersion } from './validateApiVersion';

export default ({ globalConfiguration = {}, localConfiguration = {} }) => {
  const { getAccessToken, baseUrl = 'https://api.teamleader.eu', version: globalVersion } = globalConfiguration; // only destruct what we might need on request level
  const { version: localVersion } = localConfiguration;

  const plugins = mergePlugins(globalConfiguration.plugins, localConfiguration.plugins);

  const mergedConfiguration = {
    getAccessToken,
    baseUrl,
    plugins,
  };

  if (localVersion !== undefined) {
    validateApiVersion(localVersion);

    return {
      ...mergedConfiguration,
      version: localVersion,
    };
  }

  if (globalVersion !== undefined) {
    validateApiVersion(globalVersion);

    return {
      ...mergedConfiguration,
      version: globalVersion,
    };
  }

  return mergedConfiguration;
};
