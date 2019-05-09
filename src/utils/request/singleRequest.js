import checkStatus from './checkStatus';

const singleRequest = async (url, fetchOptions = {}) => {
  const data = await fetch(url, fetchOptions);
  return checkStatus(data);
};

export default singleRequest;
