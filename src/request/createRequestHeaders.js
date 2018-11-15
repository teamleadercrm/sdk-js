export default async getAccessToken => {
  const accessToken = await getAccessToken();

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
};
