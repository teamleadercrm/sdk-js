const createHeaders = async (config = {}) => {
  const { contentType = 'application/json', getAccessToken } = config;

  if (!getAccessToken) {
    throw new Error('pass in an (async) function that returns a valid accessToken');
  }

  const accessToken = await getAccessToken();

  const headers = {
    'Content-Type': contentType,
    Authorization: `Bearer ${accessToken}`,
  };

  return headers;
};

export default createHeaders;
