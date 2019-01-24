import checkStatus from './checkStatus';

const singleRequest = (url, fetchOptions = {}) => fetch(url, fetchOptions).then(checkStatus);

export default singleRequest;
