const responseHandler = response => {
  if (!response) {
    return response;
  }
  return response.json();
};

const call = (url, options) => fetch(url, options).then(responseHandler);
export default call;
