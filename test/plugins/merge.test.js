import merge from '../../src/plugins/merge';

describe(`merge data`, () => {
  it(`should merge the included data into the main data`, () => {
    const data = {
      data: {
        id: '975c4914-aa31-46ef-a99c-cfbe8a3cc6f8',
        participant: {
          type: 'user',
          id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
        },
      },
      included: {
        user: [
          {
            id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
            last_name: 'Appleseed',
          },
        ],
      },
    };

    const result = {
      data: {
        id: '975c4914-aa31-46ef-a99c-cfbe8a3cc6f8',
        participant: {
          type: 'user',
          id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
          last_name: 'Appleseed',
        },
      },
    };

    expect(merge(data, 'participant')).toEqual(result);
  });

  it(`should merge the included data if the main data is an array`, () => {
    const data = {
      data: [
        {
          id: '975c4914-aa31-46ef-a99c-cfbe8a3cc6f8',
          participant: {
            type: 'user',
            id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
          },
        },
        {
          id: '78a3711d-5dd9-4f44-b6ea-49bffdd94424',
          participant: {
            type: 'user',
            id: '1f0b1bfb-a962-4802-a31c-a81270fc87e2',
          },
        },
      ],
      included: {
        user: [
          {
            id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
            last_name: 'Appleseed',
          },
          {
            id: '1f0b1bfb-a962-4802-a31c-a81270fc87e2',
            last_name: 'Smith',
          },
        ],
      },
    };

    const result = {
      data: [
        {
          id: '975c4914-aa31-46ef-a99c-cfbe8a3cc6f8',
          participant: {
            type: 'user',
            id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
            last_name: 'Appleseed',
          },
        },
        {
          id: '78a3711d-5dd9-4f44-b6ea-49bffdd94424',
          participant: {
            type: 'user',
            id: '1f0b1bfb-a962-4802-a31c-a81270fc87e2',
            last_name: 'Smith',
          },
        },
      ],
    };

    expect(merge(data, 'participant')).toEqual(result);
  });

  it('should merge the data when the parent path is an array', () => {
    const data = {
      data: [
        {
          id: '975c4914-aa31-46ef-a99c-cfbe8a3cc6f8',
          participants: [
            {
              type: 'user',
              id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
            },
            {
              type: 'user',
              id: '1f0b1bfb-a962-4802-a31c-a81270fc87e2',
            },
            {
              type: 'user',
              id: '0b1fd147-7853-4aa9-87ff-b640d1c4a62f',
            },
          ],
        },
        {
          id: '78a3711d-5dd9-4f44-b6ea-49bffdd94424',
          participants: [
            {
              type: 'user',
              id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
            },
            {
              type: 'user',
              id: '0b1fd147-7853-4aa9-87ff-b640d1c4a62f',
            },
          ],
        },
      ],
      included: {
        user: [
          {
            id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',
            last_name: 'Appleseed',
          },
          {
            id: '1f0b1bfb-a962-4802-a31c-a81270fc87e2',
            last_name: 'Smith',
          },
          {
            id: '0b1fd147-7853-4aa9-87ff-b640d1c4a62f',
            last_name: 'Wick',
          },
        ],
      },
    };

    const result = {
      data: [
        {
          id: '975c4914-aa31-46ef-a99c-cfbe8a3cc6f8',
          participants: [
            {
              type: 'user',
              id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',

              last_name: 'Appleseed',
            },
            {
              type: 'user',
              id: '1f0b1bfb-a962-4802-a31c-a81270fc87e2',
              last_name: 'Smith',
            },
            {
              type: 'user',
              id: '0b1fd147-7853-4aa9-87ff-b640d1c4a62f',
              last_name: 'Wick',
            },
          ],
        },
        {
          id: '78a3711d-5dd9-4f44-b6ea-49bffdd94424',
          participants: [
            {
              type: 'user',
              id: '5bce766d-3996-41fe-ac5c-bcf8b50d59d8',

              last_name: 'Appleseed',
            },
            {
              type: 'user',
              id: '0b1fd147-7853-4aa9-87ff-b640d1c4a62f',
              last_name: 'Wick',
            },
          ],
        },
      ],
    };

    expect(merge(data, 'participants')).toEqual(result);
  });
});
