import createDomain from '../utils/createDomain';

const creditNotes = config =>
  createDomain({
    config,
    domain: 'creditNotes',
    actions: ['list', 'info'],
  });

export default creditNotes;
