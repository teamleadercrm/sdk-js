import createDomainWithActions from '../utils/createDomainWithActions';

const productCategories = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'productCategories',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default productCategories;
