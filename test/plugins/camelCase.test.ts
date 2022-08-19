import { camelCase } from '../../src/main';

describe(`camelCase data`, () => {
  it(`should return the data camelCased`, () => {
    const data = {
      id: '8799873',
      user_id: '6979873',
      user_info: {
        first_name: 'Geoffrey',
      },
    };

    expect(camelCase({ data })).toEqual({
      data: {
        id: '8799873',
        userId: '6979873',
        userInfo: {
          firstName: 'Geoffrey',
        },
      },
    });
  });
});
