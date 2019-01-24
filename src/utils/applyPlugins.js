const applyPlugins = (data, plugins = []) => plugins.reduce((d, plugin) => plugin(d), data);
export default applyPlugins;
