import createDomain from '../utils/createDomain';

const lostReasons = config =>
  createDomain({
    config,
    domain: 'lostReasons',
    actions: ['list', ...(config.customActions || [])],
  });

export default lostReasons;
