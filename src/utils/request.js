import singleRequest from './singleRequest';
import applyPlugins from './applyPlugins';
import mergeArraysOnProperty from './mergeArraysOnProperty';
import createFetchOptions from './createFetchOptions';
import fetchAllRequest from './fetchAllRequest';

const request = async (url, parameters, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {}, fetchAll = false } = configuration;

  if (fetchAll) {
    const fetchOptions = await createFetchOptions({
      parameters: { ...parameters, page: { number: 1 } },
      configuration,
    });

    const firstRequestData = await singleRequest(url, fetchOptions);

    if (firstRequestData.meta === undefined || firstRequestData.meta.matches === undefined) {
      throw new Error(
        `The endpoint ${url} does contain the 'matches' key in the meta information and therefore fetchAll will not work here.`,
      );
    }

    const {
      meta: {
        page: { size },
        matches,
      },
    } = firstRequestData;

    const amountOfRequests = Math.ceil(matches / size);

    // do the 2nd batch in parallel
    const parallelRequestData = await fetchAllRequest(url, amountOfRequests, parameters, configuration);

    return applyPlugins(
      { data: mergeArraysOnProperty('data', firstRequestData, ...parallelRequestData) },
      responsePlugins,
    );
  }

  const fetchOptions = await createFetchOptions({ parameters, configuration });
  const data = await singleRequest(url, fetchOptions);
  return applyPlugins(data, responsePlugins);
};

export default request;
