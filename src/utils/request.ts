import singleRequest from './singleRequest';
import applyPlugins from './applyPlugins';
import mergeArraysOnProperty from './mergeArraysOnProperty';
import fetchAllRequest from './fetchAllRequest';
import createRequestUrl from './createRequestUrl';
import merge from 'lodash.merge';
import { Configuration } from '../types';

const request = async ({
  domainName,
  actionName,
  parameters = {},
  configuration = {},
}: {
  domainName: string;
  actionName: string;
  parameters?: Record<string, any> | null;
  configuration?: Configuration;
}) => {
  const { plugins: { response: responsePlugins = [] } = {}, fetchAll = false } = configuration;

  const url = createRequestUrl({ configuration, domainName, actionName });

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

    // Fall back to 1 in case the amount of requests is 0
    const amountOfRequests = Math.ceil(matches / size) || 1;

    // do the 2nd batch in parallel
    const parallelRequestData = await fetchAllRequest({ url, parameters, configuration }, amountOfRequests);

    return applyPlugins(
      { data: mergeArraysOnProperty('data', firstRequestData, ...parallelRequestData) },
      responsePlugins,
      domainName,
    );
  }

  return applyPlugins(firstRequestData, responsePlugins, domainName);
};

export default request;
