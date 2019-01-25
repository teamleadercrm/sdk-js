import API, { camelCase, normalize } from '../src/main';

describe('fetch response handling', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('shoud add the customActions to the correct domains', () => {
    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      customActions: {
        contacts: ['deleted'],
        activityTypes: ['deleted'],
      },
    });

    const activityTypesMethods = ['list', 'deleted'];
    expect(Object.keys(api.activityTypes).sort()).toEqual(activityTypesMethods.sort());

    const contactsMethods = [
      'list',
      'info',
      'add',
      'update',
      'delete',
      'tag',
      'untag',
      'linkToCompany',
      'unlinkFromCompany',
      'deleted',
    ];
    expect(Object.keys(api.contacts).sort()).toEqual(contactsMethods.sort());

    const dealPhasesMethods = ['list'];
    expect(Object.keys(api.dealPhases).sort()).toEqual(dealPhasesMethods.sort());
  });

  it('should run the correct response plugins', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { id: '84845512', name: 'john', last_name: 'doe' } }), {
      headers: { 'content-type': 'application/json' },
    });

    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      plugins: {
        response: [camelCase],
      },
    });

    const data = await api.contacts.info({ userId: '84989' }, { plugins: { response: [normalize] } });
    expect(data).toEqual({ byId: { '84845512': { id: '84845512', lastName: 'doe', name: 'john' } } });
  });

  it('shoud include all domains', () => {
    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      customActions: {
        contacts: ['deleted'],
        activityTypes: ['deleted'],
      },
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
      'lostReasons',
      'milestones',
      'paymentTerms',
      'productCategories',
      'projects',
      'quotations',
      'tags',
      'taxRates',
      'timers',
      'timeTracking',
      'users',
      'workTypes',
      'withholdingTaxRates',
    ];

    expect(Object.keys(api).sort()).toEqual(domains.sort());
  });
});
