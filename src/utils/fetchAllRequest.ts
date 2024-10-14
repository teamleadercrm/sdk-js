import singleRequest from './singleRequest';
import merge from 'lodash/merge';
import { Configuration } from '../types';

const fetchAllRequest = async (
  config: { url: string; parameters: Record<string, any> | null; configuration: Configuration },
  amountOfRequests: number,
) => {
  const data = await Promise.all(
    [...new Array(amountOfRequests - 1)] // -1 because we already did a firstRequest
      .map((_, i) => singleRequest(merge({}, config, { parameters: { page: { number: i + 2 } } }))),
  );
  return data;
};

export default fetchAllRequest;
