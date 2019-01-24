import checkStatus from './checkStatus';
import applyPlugins from '../applyPlugins';

const request = (url, fetchOptions = {}, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {} } = configuration;

  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(data => applyPlugins(data, responsePlugins));
};

export default request;
