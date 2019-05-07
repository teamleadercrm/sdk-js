export default async ({ getAccessToken, version } = {}) => ({
  'Content-Type': 'application/json',
  ...(getAccessToken && { Authorization: `Bearer ${await getAccessToken()}` }),
  ...(version && { 'X-Api-Version': version }),
});
