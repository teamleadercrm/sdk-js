import mergePlugins from './mergePlugins';
import isValidDate from './isValidDate';

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
    if (!isValidDate(localVersion)) {
      throw new Error(`'${localVersion}' is not a valid API version.`);
    }

    return {
      ...mergedConfiguration,
      version: localVersion,
    };
  }

  if (globalVersion !== undefined) {
    if (!isValidDate(globalVersion)) {
      throw new Error(`'${globalVersion}' is not a valid API version.`);
    }

    return {
      ...mergedConfiguration,
      version: globalVersion,
    };
  }

  return mergedConfiguration;
};
