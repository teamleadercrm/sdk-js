import createDomain from '../utils/createDomain';

const timeTracking = config =>
  createDomain({
    config,
    domain: 'timeTracking',
    actions: ['list', 'info', 'add', 'update', 'resume', ...(config.customActions || [])],
  });

export default timeTracking;
