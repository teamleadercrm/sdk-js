import getRequestDomain from '../utils/getRequestDomain';

export default ({ data }, requestUrl) => {
  const requestedDomain = getRequestDomain(requestUrl);

  let dataArray;
  if (Array.isArray(data)) {
    dataArray = data;
  } else if (Object.keys(data).length === 0) {
    dataArray = [];
  } else {
    dataArray = [data];
  }

  return dataArray.reduce((o, d) => ({ ...o, [requestedDomain]: { ...o[requestedDomain], [d.id]: d } }), {
    [requestedDomain]: {},
  });
};
