import snakeCase from '../../src/plugins/snakeCase';

describe(`snakeCase data`, () => {
  it(`should return the data snakeCased`, () => {
    const data = {
      id: '8799873',
      userId: '6979873',
      userInfo: {
        firstName: 'Geoffrey',
      },
    };

    expect(snakeCase({ data })).toEqual({
      data: {
        id: '8799873',
        user_id: '6979873',
        user_info: {
          first_name: 'Geoffrey',
        },
      },
    });
  });
});
