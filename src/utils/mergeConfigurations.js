import mergePlugins from './mergePlugins';

export default ({ globalConfiguration = {}, localConfiguration = {} }) => {
  const {
    baseUrl = 'https://api.teamleader.eu',
    version: globalVersion,
    accessToken,
    getAccessToken,
    additionalHeaders: globalHeaders,
  } = globalConfiguration; // only destruct what we might need on request level

  const { version: localVersion, fetchAll, additionalHeaders: localHeaders } = localConfiguration;

  const plugins = mergePlugins(globalConfiguration.plugins, localConfiguration.plugins);

  const additionalHeaders = { ...(globalHeaders || {}), ...(localHeaders || {}) };

  return {
    baseUrl,
    plugins,
    fetchAll,
    additionalHeaders,
    ...((accessToken || getAccessToken) && { getAccessToken: getAccessToken || (() => accessToken) }),
    ...((localVersion || globalVersion) && { version: localVersion || globalVersion }),
  };
};
