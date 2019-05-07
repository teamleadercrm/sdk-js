import singleRequest from './singleRequest';

const fetchAllRequest = async (url, amountOfRequests, fetchOptions = {}) => {
  const data = await Promise.all(
    [...new Array(amountOfRequests - 1)] // -1 because we already did a firstRequest
      .map((_, i) => i + 2) // 2, 3, 4, ...
      .map((_, number) => singleRequest(url, { ...fetchOptions, page: { number } })),
  );
  return data;
};

export default fetchAllRequest;
