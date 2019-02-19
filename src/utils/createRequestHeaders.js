export default async ({ getAccessToken, version } = {}) => ({
  'Content-Type': 'application/json',
  ...(getAccessToken ? { Authorization: `Bearer ${await getAccessToken()}` } : undefined),
  ...(version ? { 'X-Api-Version': version } : undefined),
});
