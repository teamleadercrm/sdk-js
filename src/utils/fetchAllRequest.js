import singleRequest from './singleRequest';

const fetchAllRequest = async (url, amountOfRequests, parameters, configuration = {}) => {
  const data = await Promise.all(
    [...new Array(amountOfRequests - 1)] // -1 because we already did a firstRequest
      .map((_, i) => singleRequest(url, { ...parameters, page: { number: i + 2 } }, configuration)),
  );
  return data;
};

export default fetchAllRequest;
