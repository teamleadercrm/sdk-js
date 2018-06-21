import createDomain from '../utils/createDomain';

const productCategories = config =>
  createDomain({
    config,
    domain: 'productCategories',
    actions: ['list', ...(config.customActions || [])],
  });

export default productCategories;
