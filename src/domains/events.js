import createDomain from '../utils/createDomain';

const events = config =>
  createDomain({
    config,
    domain: 'events',
    actions: ['list', 'info', 'create'],
  });

export default events;
