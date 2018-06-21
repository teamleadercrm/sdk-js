import API from '../src/main';

describe('fetch response handling', () => {
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
    ];

    expect(Object.keys(api).sort()).toEqual(domains.sort());
  });
});
