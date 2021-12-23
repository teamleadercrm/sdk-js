import mergePlugins from './mergePlugins';
import merge from 'lodash.merge';

export default ({ globalConfiguration = {}, localConfiguration = {} }) => {
  const {
    baseUrl = 'https://api.teamleader.eu',
    version: globalVersion,
    accessToken,
    getAccessToken,
  } = globalConfiguration; // only destruct what we might need on request level

  const { version: localVersion, fetchAll } = localConfiguration;

  const plugins = mergePlugins(globalConfiguration.plugins, localConfiguration.plugins);
  const fetchOptions = merge(globalConfiguration.fetchOptions, localConfiguration.fetchOptions);

  return {
    baseUrl,
    plugins,
    fetchAll,
    fetchOptions,
    ...((accessToken || getAccessToken) && { getAccessToken: getAccessToken || (() => accessToken) }),
    ...((localVersion || globalVersion) && { version: localVersion || globalVersion }),
  };
};
