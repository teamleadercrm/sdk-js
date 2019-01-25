import singleRequest from './singleRequest';
import applyPlugins from '../applyPlugins';
import mergeArraysOnProperty from '../mergeArraysOnProperty';

const request = async (url, fetchOptions = {}, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {}, fetchAll = false } = configuration;

  if (fetchAll) {
    // do a first request to get the initial amount of pages and first data
    const firstRequestData = await singleRequest(url, { ...fetchOptions, page: { number: 1 } });

    // return data when there is no meta object available
    if (firstRequestData.meta === undefined) {
      return applyPlugins(firstRequestData, responsePlugins);
    }

    const {
      meta: {
        page: { size },
        matches,
      },
    } = firstRequestData;

    // calculate the amount of requests needed to fetch all results
    const amountOfRequests = Math.ceil(matches / size);

    // do the 2nd batch in parallel
    const parallelRequestData = await Promise.all(
      [...new Array(amountOfRequests - 1)] // -1 because we already did a firstRequest
        .map((_, i) => i + 2) // 2, 3, 4, ...
        .map((_, number) => singleRequest(url, { ...fetchOptions, page: { number } })),
    );
    return applyPlugins(
      { data: mergeArraysOnProperty('data', firstRequestData, ...parallelRequestData) },
      responsePlugins,
    );
  }

  const data = await singleRequest(url, fetchOptions);
  return applyPlugins(data, responsePlugins);
};

export default request;
