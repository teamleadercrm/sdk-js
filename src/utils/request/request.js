import singleRequest from './singleRequest';
import applyPlugins from '../applyPlugins';

const request = (url, fetchOptions = {}, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {}, fetchAll = false } = configuration;

  if (fetchAll) {
    // do a first initial request
    // request the other pages in parallel
    // merge the data
    // apply the plugins
    return Promise.resolve('todo');
  }

  return singleRequest(url, fetchOptions).then(data => applyPlugins(data, responsePlugins));
};

export default request;
