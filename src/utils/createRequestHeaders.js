export default async ({ getAccessToken, version } = {}) => {
  let accessToken = getAccessToken && (await getAccessToken());
  return {
    'Content-Type': 'application/json',
    ...(typeof accessToken !== 'undefined' && { Authorization: `Bearer ${accessToken}` }),
    ...(version && { 'X-Api-Version': version }),
  };
};
