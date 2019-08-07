import getRequestDomain from '../utils/getRequestDomain';

const PLURALIZED_DOMAIN_NAMES = {
  company: 'companies',
  productCategory: 'productCategories',
  timeTracking: 'timeTracking',
};

export const pluralizeDomainName = domainName => {
  return PLURALIZED_DOMAIN_NAMES[domainName] || `${domainName}s`;
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
