import getResponseData from './getResponseData';
import FetchError from './FetchError';

const checkStatus = async response => {
  const data = await getResponseData(response);

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, data);
  }

  return data;
};

export default checkStatus;
