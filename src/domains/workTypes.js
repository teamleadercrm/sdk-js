import createDomain from '../utils/createDomain';

const workTypes = config =>
  createDomain({
    config,
    domain: 'workTypes',
    actions: ['list', ...(config.customActions || [])],
  });

export default workTypes;
