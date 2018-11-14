import mergePlugins from './mergePlugins';

export default ({ globalConfiguration = {}, localConfiguration = {} }) => {
  const { getAccessToken, baseUrl = 'https://api.teamleader.eu' } = globalConfiguration; // only destruct what we might need on request level

  const plugins = mergePlugins(globalConfiguration.plugins, localConfiguration.plugins);

  return {
    getAccessToken,
    baseUrl,
    plugins,
  };
};
