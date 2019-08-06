const getRequestDomain = requestUrl => {
  const url = new URL(requestUrl);

  return url.pathname.substring(1).split('.')[0];
};
export default getRequestDomain;
