import createDomain from '../utils/createDomain';

const activityTypes = config =>
  createDomain({
    config,
    domain: 'activityTypes',
    actions: ['list'],
  });

export default activityTypes;
