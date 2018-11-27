export default async ({ getAccessToken, version = undefined } = {}) => {
  const accessToken = await getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  if (version !== undefined) {
    return {
      ...headers,
      'X-Api-Version': version,
    };
  }

  return headers;
};
