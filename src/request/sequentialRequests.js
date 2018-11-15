import createFetchOptions from './createFetchOptions';
import checkStatus from './checkStatus';

export default async (requestUrl, parameters, configuration) => {
  const pageNumber = 1;

  const fetchOptions = await createFetchOptions({
    configuration,
    parameters: {
      ...parameters,
      page: { size: 100, number: pageNumber },
    },
  });

  return fetch(requestUrl, fetchOptions).then(checkStatus);
};
