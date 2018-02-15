const responseHandler = response => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return response.text();
};

const call = (url, options) => fetch(url, options).then(responseHandler);
export default call;
