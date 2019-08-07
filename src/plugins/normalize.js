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

export const normalizeItemsById = items => {
  let dataArray;
  if (Array.isArray(items)) {
    dataArray = items;
  } else if (Object.keys(items).length === 0) {
    dataArray = [];
  } else {
    dataArray = [items];
  }

  return dataArray.reduce((object, data) => ({ ...object, [data.id]: data }), {});
};

export default ({ data, included }, requestUrl) => {
  const requestedDomain = getRequestDomain(requestUrl);

  const normalizedData = normalizeItemsById(data);
  let normalizedIncludedData;

  if (included) {
    normalizedIncludedData = Object.entries(included).reduce(
      (acc, [domainName, values]) => ({ ...acc, [pluralizeDomainName(domainName)]: normalizeItemsById(values) }),
      {},
    );
  }

  return {
    [requestedDomain]: normalizedData,
    ...(included ? normalizedIncludedData : {}),
  };
};
