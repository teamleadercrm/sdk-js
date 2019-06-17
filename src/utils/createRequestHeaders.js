export default async ({ getAccessToken, version } = {}) => {
  let accessToken = undefined;
  return {
    'Content-Type': 'application/json',
    ...(getAccessToken &&
      (accessToken = await getAccessToken()) !== undefined && { Authorization: `Bearer ${accessToken}` }),
    ...(version && { 'X-Api-Version': version }),
  };
};
