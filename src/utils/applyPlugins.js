import flow from './flow';

const applyPlugins = (data, plugins = []) =>
  flow(
    data,
    plugins,
  );

export default applyPlugins;
