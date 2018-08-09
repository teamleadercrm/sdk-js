import createDomain from '../utils/createDomain';

const deals = config =>
  createDomain({
    config,
    domain: 'deals',
    actions: [
      'list',
      'info',
      'create',
      'update',
      'move',
      'win',
      'lose',
      'open',
      'delete',
      ...(config.customActions || []),
    ],
  });

export default deals;
