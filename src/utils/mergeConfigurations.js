import mergePlugins from './mergePlugins';
import mergeHeaders from './mergeHeaders';

export default ({ globalConfiguration = {}, localConfiguration = {} }) => {
  const {
    baseUrl = 'https://api.teamleader.eu',
    version: globalVersion,
    accessToken,
    getAccessToken,
  } = globalConfiguration; // only destruct what we might need on request level

  const { version: localVersion, fetchAll } = localConfiguration;

  const plugins = mergePlugins(globalConfiguration.plugins, localConfiguration.plugins);
  const additionalHeaders = mergeHeaders(globalConfiguration.additionalHeaders, localConfiguration.additionalHeaders);

  return {
    baseUrl,
    plugins,
    fetchAll,
    additionalHeaders,
    ...((accessToken || getAccessToken) && { getAccessToken: getAccessToken || (() => accessToken) }),
    ...((localVersion || globalVersion) && { version: localVersion || globalVersion }),
  };
};
