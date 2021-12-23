import API, { camelCase, normalize } from '../src/main';

describe('fetch response handling', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should add the additional domains to the API objects', () => {
    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      additionalActions: {
        products: ['list'],
        contacts: ['deleted'],
      },
    });

    const expectedDomains = [
      'activityTypes',
      'businessTypes',
      'companies',
      'contacts',
      'creditNotes',
      'customFieldDefinitions',
      'dealPhases',
      'deals',
      'dealSources',
      'departments',
      'events',
      'invoices',
      'levelTwoAreas',
      'lostReasons',
      'products',
      'milestones',
      'paymentTerms',
      'productCategories',
      'projects',
      'quotations',
      'tags',
      'tasks',
      'taxRates',
      'timers',
      'timeTracking',
      'users',
      'workTypes',
      'withholdingTaxRates',
      'workOrders',
    ];

    expect(Object.keys(api).sort()).toEqual(expectedDomains.sort());
  });

  it('should add the additional action to existing domain', () => {
    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      additionalActions: {
        products: ['list'],
        contacts: ['deleted'],
      },
    });

    const expectedContactsMethods = [
      'add',
      'delete',
      'info',
      'linkToCompany',
      'list',
      'tag',
      'deleted',
      'unlinkFromCompany',
      'untag',
      'update',
    ];

    expect(Object.keys(api.contacts).sort()).toEqual(expectedContactsMethods.sort());
  });

  it('should add the additional action to a new domain', () => {
    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      additionalActions: {
        newDomain: ['list'],
      },
    });

    const expectedNewDomainMethods = ['list'];

    expect(Object.keys(api.newDomain).sort()).toEqual(expectedNewDomainMethods.sort());
  });

  it('should run the correct response plugins', async () => {
    fetch.once(JSON.stringify({ data: { id: '84845512', name: 'john', last_name: 'doe' } }), {
      headers: { 'content-type': 'application/json' },
    });

    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      plugins: {
        response: [camelCase],
      },
    });

    const data = await api.contacts.info({ userId: '84989' }, { plugins: { response: [normalize] } });
    expect(data).toEqual({ contacts: { 84845512: { id: '84845512', lastName: 'doe', name: 'john' } } });
  });

  it('should include all domains', () => {
    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
    });

    const domains = [
      'activityTypes',
      'businessTypes',
      'companies',
      'contacts',
      'creditNotes',
      'customFieldDefinitions',
      'dealPhases',
      'deals',
      'dealSources',
      'departments',
      'events',
      'invoices',
      'levelTwoAreas',
      'lostReasons',
      'milestones',
      'paymentTerms',
      'productCategories',
      'products',
      'projects',
      'quotations',
      'tags',
      'tasks',
      'taxRates',
      'timers',
      'timeTracking',
      'users',
      'workTypes',
      'workOrders',
      'withholdingTaxRates',
    ];

    expect(Object.keys(api).sort()).toEqual(domains.sort());
  });
});
