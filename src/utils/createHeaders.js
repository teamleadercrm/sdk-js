const createHeaders = async (config = {}) => {
  const { contentType = 'application/json', getAccessToken } = config;

  const accessToken = await getAccessToken();

  const headers = {
    'Content-Type': contentType,
    Authorization: `Bearer ${accessToken}`,
  };

  return headers;
};

export default createHeaders;
