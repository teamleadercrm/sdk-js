import normalize from '../../src/plugins/normalize';

describe(`normalize data`, () => {
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

    expect(normalize({ data })).toEqual({
      byId: {
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
});