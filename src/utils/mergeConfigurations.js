import mergePlugins from './mergePlugins';

export default ({ globalConfiguration = {}, localConfiguration = {} }) => {
  const { getAccessToken, baseUrl = 'https://api.teamleader.eu', version: globalVersion } = globalConfiguration; // only destruct what we might need on request level
  const { version: localVersion, fetchAll } = localConfiguration;

  const plugins = mergePlugins(globalConfiguration.plugins, localConfiguration.plugins);

  const mergedConfiguration = {
    getAccessToken,
    baseUrl,
    plugins,
    fetchAll,
  };

  if (localVersion !== undefined) {
    return {
      ...mergedConfiguration,
      version: localVersion,
    };
  }

  if (globalVersion !== undefined) {
    return {
      ...mergedConfiguration,
      version: globalVersion,
    };
  }

  return mergedConfiguration;
};
