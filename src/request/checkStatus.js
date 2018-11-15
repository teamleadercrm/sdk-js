import getResponseData from './getResponseData';

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

export default response =>
  getResponseData(response).then(data => {
    if (!response.ok) {
      throw new FetchError(response.status, response.statusText, data);
    }

    return data;
  });
