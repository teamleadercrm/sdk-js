import domains from '../../src/config/domains';

describe(`domains config file`, () => {
  const tDomains = {
    departments: ['list', 'info'],
    users: ['me', 'list', 'info'],
    customFieldDefinitions: ['list', 'info'],
    workTypes: ['list'],
    contacts: ['list', 'info', 'add', 'update', 'delete', 'tag', 'untag', 'linkToCompany', 'unlinkFromCompany'],
    companies: ['list', 'info', 'add', 'update', 'delete', 'tag', 'untag'],
    businessTypes: ['list'],
    tags: ['list'],
    deals: ['list', 'info', 'create', 'update', 'move', 'win', 'lose', 'delete'],
    lostReasons: ['list'],
    dealPhases: ['list'],
    dealSources: ['list'],
    quotations: ['info', 'download'],
    events: ['list', 'info', 'create', 'update', 'cancel'],
    activityTypes: ['list'],
    invoices: ['list', 'info', 'download', 'draft', 'update', 'copy', 'book', 'delete', 'registerPayment'],
    creditNotes: ['list', 'info', 'download'],
    taxRates: ['list'],
    paymentTerms: ['list'],
    withholdingTaxRates: ['list'],
    productCategories: ['list'],
    projects: ['list', 'info', 'create', 'update', 'delete', 'addParticipant', 'updateParticipant'],
    milestones: ['list', 'info', 'create', 'update'],
    timeTracking: ['list', 'info', 'add', 'update', 'resume', 'delete'],
    timers: ['current', 'start', 'stop', 'update'],
  };

  it(`should equal the provided list of domains`, () => {
    expect(domains).toEqual(tDomains);
  });
});
