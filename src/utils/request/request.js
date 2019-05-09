import singleRequest from './singleRequest';
import applyPlugins from '../applyPlugins';
import mergeArraysOnProperty from '../mergeArraysOnProperty';
import fetchAllRequest from './fetchAllRequest';

const request = async (url, fetchOptions = {}, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {}, fetchAll = false } = configuration;

  if (fetchAll) {
    const { body = '{}' } = fetchOptions;
    let parsedBody = JSON.parse(body);
    parsedBody.page = { number: 1 };
    const firstRequestData = await singleRequest(url, { ...fetchOptions, body: JSON.stringify(parsedBody) });

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
