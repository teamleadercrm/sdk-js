import createDomain from '../utils/createDomain';

const tags = config =>
  createDomain({
    config,
    domain: 'tags',
    actions: ['list', ...(config.customActions || [])],
  });

export default tags;
