import flow from './flow';
import createFetchOptions from './createFetchOptions';

class FetchError extends Error {
  constructor(status, statusText, body) {
    super(statusText);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

const getResponseData = response => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }

  return response.text();
};

const checkStatus = response => {
  return getResponseData(response).then(data => {
    if (!response.ok) {
      throw new FetchError(response.status, response.statusText, data);
    }

    return data;
  });
};

const request = async (requestUrl, parameters = {}, configuration = {}) => {
  const { plugins: { response: responsePlugins = [] } = {} } = configuration;
  const fetchOptions = await createFetchOptions({ configuration, parameters });

  return fetch(requestUrl, fetchOptions)
    .then(checkStatus)
    .then(data => flow(data, responsePlugins));
};

export default request;
