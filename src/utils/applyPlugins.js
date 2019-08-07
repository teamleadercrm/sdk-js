const applyPlugins = (data, plugins = [], domainName) => plugins.reduce((d, plugin) => plugin(d, domainName), data);
export default applyPlugins;
