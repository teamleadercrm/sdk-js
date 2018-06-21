import createDomain from '../utils/createDomain';

const customFieldDefinitions = config =>
  createDomain({
    config,
    domain: 'customFieldDefinitions',
    actions: ['list', 'info', ...(config.customActions || [])],
  });

export default customFieldDefinitions;
