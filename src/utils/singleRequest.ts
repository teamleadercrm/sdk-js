import checkStatus from './checkStatus';
import createFetchOptions from './createFetchOptions';

const singleRequest = async ({ url, parameters = {}, configuration = {} } = {}) => {
  const fetchOptions = await createFetchOptions({ parameters, configuration });
  const data = await fetch(url, fetchOptions);
  return checkStatus(data);
};

export default singleRequest;
