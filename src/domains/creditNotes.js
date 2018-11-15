import createDomainWithActions from '../utils/createDomainWithActions';

const creditNotes = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'creditNotes',
    actions: ['list', 'info', 'download', ...(configuration.customActions || [])],
  });

export default creditNotes;
