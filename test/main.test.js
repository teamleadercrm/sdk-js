import API from '../src/main';

describe('fetch response handling', () => {
  it('shoud add the customMethods to the correct domains', () => {
    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      customMethods: {
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
      'linkToCompany',
      'unlinkFromCompany',
      'deleted',
    ];
    expect(Object.keys(api.contacts).sort()).toEqual(contactsMethods.sort());

    const dealPhasesMethods = ['list'];
    expect(Object.keys(api.dealPhases).sort()).toEqual(dealPhasesMethods.sort());
  });
});
