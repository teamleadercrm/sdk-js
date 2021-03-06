import API, { camelCase, normalize, createDomainWithActions } from '../src/main';

describe('fetch response handling', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should add the customActions to the correct domains', () => {
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

  it('should trigger a deprecation warning when using customActions', () => {
    const spy = jest.spyOn(global.console, 'warn');
    API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      customActions: {
        contacts: ['deleted'],
        activityTypes: ['deleted'],
      },
    });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
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
    expect(data).toEqual({ contacts: { '84845512': { id: '84845512', lastName: 'doe', name: 'john' } } });
  });

  it('should include all domains', () => {
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

  it('should trigger a deprecation warning when using createDomainWithActions', () => {
    const spy = jest.spyOn(global.console, 'warn');
    createDomainWithActions();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
