import { normalize } from '../../src/main';

describe(`normalize data`, () => {
  const requestUrl = 'http://mock.teamleader.api/users.list';

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
});
