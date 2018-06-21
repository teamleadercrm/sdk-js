import createDomain from '../utils/createDomain';

const timers = config =>
  createDomain({
    config,
    domain: 'timers',
    actions: ['current', 'start', 'stop', ...(config.customActions || [])],
  });

export default timers;
