import createDomain from '../utils/createDomain';

const deals = config =>
  createDomain({
    config,
    domain: 'deals',
    actions: ['list', 'info', 'create', 'update', 'move', 'win', 'lose', 'delete', ...(config.customActions || [])],
  });

export default deals;
