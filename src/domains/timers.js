import createDomain from '../utils/createDomain';

const timers = config =>
  createDomain({
    config,
    domain: 'timers',
    actions: ['current', 'start', 'stop', 'update', ...(config.customActions || [])],
  });

export default timers;
