import { Plugin } from '../types';

const applyPlugins = (data: any, plugins: Plugin[] = [], domainName?: string) =>
  plugins.reduce((d, plugin) => plugin(d, domainName), data);
export default applyPlugins;
