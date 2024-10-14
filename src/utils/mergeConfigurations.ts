import mergePlugins from './mergePlugins';
import merge from 'lodash/merge';

import { Configuration, GlobalConfiguration, LocalConfiguration } from '../types';

export default ({
  globalConfiguration = {},
  localConfiguration = {},
}: {
  globalConfiguration?: GlobalConfiguration;
  localConfiguration?: LocalConfiguration;
}): Configuration => {
  const {
    baseUrl = 'https://api.teamleader.eu',
    version: globalVersion,
    accessToken,
    getAccessToken,
  } = globalConfiguration; // only destruct what we might need on request level

  const { version: localVersion, fetchAll } = localConfiguration;

  const plugins = mergePlugins(globalConfiguration.plugins || {}, localConfiguration.plugins || {});
  const fetchOptions = merge(globalConfiguration.fetchOptions, localConfiguration.fetchOptions);

  const mergedConfiguration = {
    baseUrl,
    plugins,
    fetchAll,
    fetchOptions,
    ...((accessToken || getAccessToken) && { getAccessToken: getAccessToken || (() => accessToken) }),
    ...((localVersion || globalVersion) && { version: localVersion || globalVersion }),
  };

  return mergedConfiguration;
};
