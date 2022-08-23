import { Configuration } from '../types';
import checkStatus from './checkStatus';
import createFetchOptions from './createFetchOptions';

const singleRequest = async ({
  url = '', // @todo probably shouldn't have a default value, but needed to add it beause there is a default {} value
  parameters = {},
  configuration = {},
}: { url?: string; parameters?: Record<string, any>; configuration?: Configuration } = {}) => {
  const fetchOptions = await createFetchOptions({ parameters, configuration });
  const data = await fetch(url, fetchOptions);
  return checkStatus(data);
};

export default singleRequest;
