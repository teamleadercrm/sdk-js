import singleRequest from './singleRequest';

const fetchAllRequest = async (url, amountOfRequests, fetchOptions = {}) => {
  const data = await Promise.all(
    [...new Array(amountOfRequests - 1)] // -1 because we already did a firstRequest
      .map((_, i) => singleRequest(url, { ...fetchOptions, page: { number: i + 2 } })),
  );
  return data;
};

export default fetchAllRequest;
