import createDomain from '../utils/createDomain';

const businessTypes = config =>
  createDomain({
    config,
    domain: 'businessTypes',
    actions: ['list'],
  });

export default businessTypes;
