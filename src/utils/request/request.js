import singleRequest from './singleRequest';
import applyPlugins from '../applyPlugins';
import mergeArraysOnProperty from '../mergeArraysOnProperty';
import fetchAllRequest from './fetchAllRequest';

const request = async (url, fetchOptions = {}, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {}, fetchAll = false } = configuration;

  if (fetchAll) {
    const firstRequestData = await singleRequest(url, { ...fetchOptions, page: { number: 1 } });

    if (firstRequestData.meta === undefined || firstRequestData.meta.matches === undefined) {
      return applyPlugins(firstRequestData, responsePlugins);
    }

    const {
      meta: {
        page: { size },
        matches,
      },
    } = firstRequestData;

    const amountOfRequests = Math.ceil(matches / size);

    // do the 2nd batch in parallel
    const parallelRequestData = await fetchAllRequest(url, amountOfRequests, fetchOptions);

    return applyPlugins(
      { data: mergeArraysOnProperty('data', firstRequestData, ...parallelRequestData) },
      responsePlugins,
    );
  }

  const data = await singleRequest(url, fetchOptions);
  return applyPlugins(data, responsePlugins);
};

export default request;
