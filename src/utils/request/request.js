import singleRequest from './singleRequest';
import applyPlugins from '../applyPlugins';

const request = (url, fetchOptions = {}, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {} } = configuration;
  return singleRequest(url, fetchOptions).then(data => applyPlugins(data, responsePlugins));
};

export default request;
