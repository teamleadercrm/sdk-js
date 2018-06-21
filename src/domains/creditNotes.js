import createDomain from '../utils/createDomain';

const creditNotes = config =>
  createDomain({
    config,
    domain: 'creditNotes',
    actions: ['list', 'info', 'download', ...(config.customActions || [])],
  });

export default creditNotes;
