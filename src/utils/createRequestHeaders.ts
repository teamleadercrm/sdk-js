import { Configuration } from '../types';

export default async ({
  getAccessToken,
  version,
  headers,
}: {
  getAccessToken?: Configuration['getAccessToken'];
  version?: Configuration['version'];
  headers?: HeadersInit;
} = {}): Promise<HeadersInit> => {
  const accessToken = getAccessToken && (await getAccessToken());
  return {
    'Content-Type': 'application/json',
    ...(typeof accessToken !== 'undefined' && { Authorization: `Bearer ${accessToken}` }),
    ...(version && { 'X-Api-Version': version }),
    ...headers,
  };
};
