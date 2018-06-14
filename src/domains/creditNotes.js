import createDomain from '../utils/createDomain';

const creditNotes = config =>
  createDomain({
    config,
    domain: 'creditNotes',
    actions: ['list', 'info', ...(config.customActions || [])],
  });

export default creditNotes;
