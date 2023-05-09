import fetchMock from 'jest-fetch-mock';

import request from '../../utils/request';
import camelCase from '../../plugins/camelCase';

describe('fetch response handling', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns json when the response was successful', async () => {
    fetchMock.once(JSON.stringify({ foo: 'bar' }), {
      headers: { 'content-type': 'application/json' },
    });

    const jsonResponse = await request({
      domainName: 'users',
      actionName: 'list',
      configuration: { plugins: { response: [camelCase] } },
    });

    expect(jsonResponse).toEqual({
      foo: 'bar',
    });
  });

  it('returns the correct data after running the plugins', async () => {
    fetchMock.once(JSON.stringify({ data: { user_id: 'bar' } }), {
      headers: { 'content-type': 'application/json' },
    });

    const jsonResponse = await request({
      domainName: 'users',
      actionName: 'list',
      configuration: { plugins: { response: [camelCase] } },
    });

    expect(jsonResponse).toEqual({ data: { userId: 'bar' } });
  });

  it('returns the correct data with fetchAll enabled', async () => {
    const headers = { 'content-type': 'application/json' };

    fetchMock
      .once(
        JSON.stringify({
          data: [{ name: 'John', last_name: 'Doe' }],
          meta: {
            page: {
              size: 1,
              number: 1,
            },
            matches: 3,
          },
        }),
        { headers },
      )
      .once(
        JSON.stringify({
          data: [{ name: 'Alex', last_name: 'Turner' }],
          meta: {
            page: {
              size: 1,
              number: 2,
            },
            matches: 3,
          },
        }),
        { headers },
      )
      .once(
        JSON.stringify({
          data: [{ name: 'William', last_name: 'Hurt' }],
          meta: {
            page: {
              size: 1,
              number: 3,
            },
            matches: 3,
          },
        }),
        { headers },
      );

    const jsonResponse = await request({
      domainName: 'users',
      actionName: 'list',
      configuration: { plugins: { response: [camelCase] }, fetchAll: true },
    });

    expect(jsonResponse).toEqual({
      data: [
        { name: 'John', lastName: 'Doe' },
        { name: 'Alex', lastName: 'Turner' },
        { name: 'William', lastName: 'Hurt' },
      ],
      included: {},
    });
  });

  it('returns the correct data with fetchAll and sideloading enabled', async () => {
    const headers = { 'content-type': 'application/json' };

    fetchMock
      .once(
        JSON.stringify({
          data: [{ name: 'John', last_name: 'Doe' }],
          included: { team: [{ name: 'Awesome' }] },
          meta: {
            page: {
              size: 1,
              number: 1,
            },
            matches: 3,
          },
        }),
        { headers },
      )
      .once(
        JSON.stringify({
          data: [{ name: 'Alex', last_name: 'Turner' }],
          included: { team: [{ name: 'Champagne' }] },
          meta: {
            page: {
              size: 1,
              number: 2,
            },
            matches: 3,
          },
        }),
        { headers },
      )
      .once(
        JSON.stringify({
          data: [{ name: 'William', last_name: 'Hurt' }],
          included: { team: [] },
          meta: {
            page: {
              size: 1,
              number: 3,
            },
            matches: 3,
          },
        }),
        { headers },
      );

    const jsonResponse = await request({
      domainName: 'users',
      actionName: 'list',
      configuration: { plugins: { response: [camelCase] }, fetchAll: true },
    });

    expect(jsonResponse).toEqual({
      data: [
        { name: 'John', lastName: 'Doe' },
        { name: 'Alex', lastName: 'Turner' },
        { name: 'William', lastName: 'Hurt' },
      ],
      included: {
        team: [{ name: 'Awesome' }, { name: 'Champagne' }],
      },
    });
  });

  it('throws and error when fetchAll is enabled but there are is matches information', async () => {
    const headers = { 'content-type': 'application/json' };

    fetchMock.once(
      JSON.stringify({
        data: [{ name: 'John', last_name: 'Doe' }],
      }),
      { headers },
    );

    await expect(
      request({
        domainName: 'users',
        actionName: 'list',
        configuration: { plugins: { response: [camelCase] }, fetchAll: true },
      }),
    ).rejects.toThrow(Error);
  });

  it('throws an error with json if the response was unsuccessful', async () => {
    fetchMock.once(JSON.stringify({ errors: ['There was an error'] }), {
      status: 500,
      statusText: 'There was an error 500',
      headers: { 'content-type': 'application/json' },
    });

    try {
      await request({
        domainName: 'users',
        actionName: 'list',
      });
    } catch (e: any) {
      expect(e.status).toEqual(500);
      expect(e.statusText).toEqual('There was an error 500');
      expect(e.message).toEqual('There was an error 500');
      expect(e.body).toEqual({
        errors: ['There was an error'],
      });
    }
  });
});
