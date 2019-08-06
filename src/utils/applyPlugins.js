const applyPlugins = (data, plugins = [], requestUrl) => plugins.reduce((d, plugin) => plugin(d, requestUrl), data);
export default applyPlugins;
