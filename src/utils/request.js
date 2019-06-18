import singleRequest from './singleRequest';
import applyPlugins from './applyPlugins';
import mergeArraysOnProperty from './mergeArraysOnProperty';
import fetchAllRequest from './fetchAllRequest';
import merge from 'lodash/merge';

const request = async ({ url, parameters = {}, configuration = {} } = {}) => {
  const { plugins: { response: responsePlugins = [] } = {}, fetchAll = false } = configuration;

  const firstRequestData = await singleRequest({
    url,
    parameters: fetchAll ? merge(parameters, { page: { number: 1 } }) : parameters,
    configuration,
  });

  if (fetchAll) {
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
    const parallelRequestData = await fetchAllRequest({ url, parameters, configuration }, amountOfRequests);

    return applyPlugins(
      { data: mergeArraysOnProperty('data', firstRequestData, ...parallelRequestData) },
      responsePlugins,
    );
  }

  return applyPlugins(firstRequestData, responsePlugins);
};

export default request;