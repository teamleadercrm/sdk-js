import singleRequest from './singleRequest';

const fetchAllRequest = async (url, amountOfRequests, fetchOptions = {}) => {
  const data = await Promise.all(
    [...new Array(amountOfRequests - 1)] // -1 because we already did a firstRequest
      .map((_, i) => {
        const { body = '{}' } = fetchOptions;
        let parsedBody = JSON.parse(body);
        parsedBody.page = { number: i + 2 };
        return singleRequest(url, { ...fetchOptions, body: JSON.stringify(parsedBody) });
      }),
  );
  return data;
};

export default fetchAllRequest;
