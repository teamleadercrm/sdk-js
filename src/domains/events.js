import createDomain from '../utils/createDomain';

const events = config =>
  createDomain({
    config,
    domain: 'events',
    actions: ['list', 'info', 'create', 'update', 'cancel', ...(config.customActions || [])],
  });

export default events;
