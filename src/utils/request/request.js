import singleRequest from './singleRequest';
import applyPlugins from '../applyPlugins';

const request = async (url, fetchOptions = {}, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {}, fetchAll = false } = configuration;

  if (fetchAll) {
    // const initialData = await singleRequest(url, {...fetchOptions, page: {}})
    // console.log(url, fetchOptions);
    // do a first initial request
    // request the other pages in parallel
    // merge the data
    // apply the plugins
    return Promise.resolve('todo');
  }

  const data = await singleRequest(url, fetchOptions);
  return applyPlugins(data, responsePlugins);
};

export default request;
