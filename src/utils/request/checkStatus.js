import getResponseData from './getResponseData';
import FetchError from './FetchError';

const checkStatus = response =>
  getResponseData(response).then(data => {
    if (!response.ok) {
      throw new FetchError(response.status, response.statusText, data);
    }

    return data;
  });

export default checkStatus;
