import getRequestDomain from '../utils/getRequestDomain';

export const pluralizeDomainName = domainName => {
  const pluralizedDomainNames = {
    company: 'companies',
    productCategory: 'productCategories',
    timeTracking: 'timeTracking',
  };

  if (Object.keys(pluralizedDomainNames).includes(domainName)) {
    return pluralizedDomainNames[domainName];
  }

  return `${domainName}s`;
};

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
