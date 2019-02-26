import API, { camelCase, normalize, createDomainWithActions } from '../src/main';
import { create } from 'domain';

describe('fetch response handling', () => {
  const mockFetch = desiredResponse => (window.fetch = () => Promise.resolve(desiredResponse));
  const response = ({ ok, statusText, status, contentType, json, text }) => {
    const headers = new Map();
    headers.set('content-type', contentType);

    return {
      ok,
      headers,
      status,
      statusText,
      json: () => Promise.resolve(json),
      text: () => Promise.resolve(text),
    };
  };

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

  it('shoud add the additional domains to the API objects', () => {
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
      'lostReasons',
      'products',
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

    expect(Object.keys(api).sort()).toEqual(expectedDomains.sort());
  });

  it('shoud add the additional action to existing domain', () => {
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

  it('shoud add the additional action to a new domain', () => {
    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      additionalActions: {
        products: ['list'],
        contacts: ['deleted'],
      },
    });

    const expectedProductsMethods = ['list'];

    expect(Object.keys(api.products).sort()).toEqual(expectedProductsMethods.sort());
  });

  it('should run the correct response plugins', () => {
    mockFetch(
      response({
        ok: true,
        contentType: 'application/json',
        json: { data: { id: '84845512', name: 'john', last_name: 'doe' } },
      }),
    );

    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      plugins: {
        response: [camelCase],
      },
    });

    api.contacts.info({ userId: '84989' }, { plugins: { response: [normalize] } }).then(data => {
      expect(data).toEqual({ byId: { '84845512': { id: '84845512', lastName: 'doe', name: 'john' } } });
    });
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

  it('should trigger a deprecation warning when using createDomainWithActions', () => {
    const spy = jest.spyOn(global.console, 'warn');
    createDomainWithActions();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
