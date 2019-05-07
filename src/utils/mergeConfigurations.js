import mergePlugins from './mergePlugins';

export default ({ globalConfiguration = {}, localConfiguration = {} }) => {
  const {
    baseUrl = 'https://api.teamleader.eu',
    version: globalVersion,
    accessToken,
    getAccessToken,
  } = globalConfiguration; // only destruct what we might need on request level

  const { version: localVersion, fetchAll } = localConfiguration;

  const plugins = mergePlugins(globalConfiguration.plugins, localConfiguration.plugins);

  return {
    baseUrl,
    plugins,
    fetchAll,
    ...((accessToken || getAccessToken) && { getAccessToken: getAccessToken || (() => accessToken) }),
    ...((localVersion || globalVersion) && { version: localVersion || globalVersion }),
  };
};
