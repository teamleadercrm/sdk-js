const PLURALIZED_DOMAIN_NAMES: Record<string, string> = {
  company: 'companies',
  productCategory: 'productCategories',
  timeTracking: 'timeTracking',
};

export const pluralizeDomainName = (domainName: string) => {
  return domainName in PLURALIZED_DOMAIN_NAMES ? PLURALIZED_DOMAIN_NAMES[domainName] : `${domainName}s`;
};

type EntityId = string | number;

interface EntityWithId {
  id: EntityId;
}

export const normalizeItemsById = <T extends EntityWithId>(items: T | Array<T>): Record<EntityId, T> => {
  let dataArray: T[];
  if (Array.isArray(items)) {
    dataArray = items;
  } else if (Object.keys(items).length === 0) {
    dataArray = [];
  } else {
    dataArray = [items];
  }

  return dataArray.reduce((object, data) => ({ ...object, [data.id]: data }), {});
};

export default ({ data, included }: { data: any; included?: Record<string, any> }, domainName: string | undefined) => {
  const normalizedData = normalizeItemsById(data);
  let normalizedIncludedData;

  if (included) {
    normalizedIncludedData = Object.entries(included).reduce(
      (acc, [domainName, values]) => ({
        ...acc,
        [pluralizeDomainName(domainName)]: normalizeItemsById(values),
      }),
      {},
    );
  }

  return {
    [String(domainName)]: normalizedData,
    ...(included ? normalizedIncludedData : {}),
  };
};
