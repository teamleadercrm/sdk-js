import createFetchOptions from './createFetchOptions';
import checkStatus from './checkStatus';

export default async (requestUrl, parameters, configuration) => {
  const fetchOptions = await createFetchOptions({ configuration, parameters });
  return fetch(requestUrl, fetchOptions).then(checkStatus);
};
