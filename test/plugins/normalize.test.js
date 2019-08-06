import { normalize } from '../../src/main';
import { pluralizeDomainName, normalizeItemsById } from '../../src/plugins/normalize';

describe(`normalize data`, () => {
  const requestUrl = 'http://mock.teamleader.api/users.list';

  it(`should return the items normalized by id`, () => {
    const data = [
      {
        id: '8799873',
        user_id: '6979873',
        user_info: {
          first_name: 'Geoffrey',
        },
      },
      {
        id: '3287687',
        user_id: '298034',
        user_info: {
          first_name: 'John',
        },
      },
    ];
    expect(normalizeItemsById(data)).toEqual({
      '8799873': {
        id: '8799873',
        user_id: '6979873',
        user_info: {
          first_name: 'Geoffrey',
        },
      },
      '3287687': {
        id: '3287687',
        user_id: '298034',
        user_info: {
          first_name: 'John',
        },
      },
    });
  });

  it(`should return the data normalized by Id`, () => {
    const data = [
      {
        id: '8799873',
        user_id: '6979873',
        user_info: {
          first_name: 'Geoffrey',
        },
      },
      {
        id: '3287687',
        user_id: '298034',
        user_info: {
          first_name: 'John',
        },
      },
    ];
    expect(normalize({ data }, requestUrl)).toEqual({
      users: {
        '8799873': {
          id: '8799873',
          user_id: '6979873',
          user_info: {
            first_name: 'Geoffrey',
          },
        },
        '3287687': {
          id: '3287687',
          user_id: '298034',
          user_info: {
            first_name: 'John',
          },
        },
      },
    });
  });
  it(`should return the data normalized by Id`, () => {
    const data = {
      id: '8799873',
      user_id: '6979873',
      user_info: {
        first_name: 'Geoffrey',
      },
    };

    expect(normalize({ data }, requestUrl)).toEqual({
      users: {
        '8799873': {
          id: '8799873',
          user_id: '6979873',
          user_info: {
            first_name: 'Geoffrey',
          },
        },
      },
    });
  });
  it(`should empty byId when data is empty`, () => {
    const data = {};

    expect(normalize({ data }, requestUrl)).toEqual({
      users: {},
    });
  });
  it('should correctly pluralize the domain names', () => {
    expect(pluralizeDomainName('contact')).toBe('contacts');
    expect(pluralizeDomainName('company')).toBe('companies');
    expect(pluralizeDomainName('timeTracking')).toBe('timeTracking');
    expect(pluralizeDomainName('milestone')).toBe('milestones');
  });
  it(`should return the data and included data normalized byId`, () => {
    const response = {
      data: [
        {
          id: '8799873',
          user_id: '6979873',
          user_info: {
            first_name: 'Geoffrey',
          },
        },
        {
          id: '3287687',
          user_id: '298034',
          user_info: {
            first_name: 'John',
          },
        },
      ],
      included: {
        contact: [
          {
            id: '6287654',
            first_name: 'Test',
            last_name: 'Tester',
          },
          {
            id: '4087634',
            first_name: 'John',
            last_name: 'Smith',
          },
        ],
        company: [
          {
            id: '6287654',
            name: 'TeamLeader',
          },
          {
            id: '1987677',
            name: 'TestLeader',
          },
        ],
      },
    };

    const result = {
      users: {
        '8799873': {
          id: '8799873',
          user_id: '6979873',
          user_info: {
            first_name: 'Geoffrey',
          },
        },
        '3287687': {
          id: '3287687',
          user_id: '298034',
          user_info: {
            first_name: 'John',
          },
        },
      },
      contacts: {
        '6287654': {
          id: '6287654',
          first_name: 'Test',
          last_name: 'Tester',
        },
        '4087634': {
          id: '4087634',
          first_name: 'John',
          last_name: 'Smith',
        },
      },
      companies: {
        '6287654': {
          id: '6287654',
          name: 'TeamLeader',
        },
        '1987677': {
          id: '1987677',
          name: 'TestLeader',
        },
      },
    };

    expect(normalize(response, requestUrl)).toEqual(result);
  });
});
