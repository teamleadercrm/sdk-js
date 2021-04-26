import mergePlugins from './mergePlugins';

export default ({ globalConfiguration = {}, localConfiguration = {} }) => {
  const {
    baseUrl = 'https://api.teamleader.eu',
    version: globalVersion,
    accessToken,
    getAccessToken,
    customHeaders: globalHeaders,
  } = globalConfiguration; // only destruct what we might need on request level

  const { version: localVersion, fetchAll, customHeaders: localHeaders } = localConfiguration;

  const plugins = mergePlugins(globalConfiguration.plugins, localConfiguration.plugins);

  const customHeaders = { ...globalHeaders, ...localHeaders };

  return {
    baseUrl,
    plugins,
    fetchAll,
    customHeaders,
    ...((accessToken || getAccessToken) && { getAccessToken: getAccessToken || (() => accessToken) }),
    ...((localVersion || globalVersion) && { version: localVersion || globalVersion }),
  };
};
