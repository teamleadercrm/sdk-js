import API, { camelCase, normalize } from '../src/main';
import * as requestModule from '../src/utils/request';

describe('fetch response handling', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should call the correct domain and action', async () => {
    const requestSpy = jest.spyOn(requestModule, 'default');
    const getAccessToken = () => 'thisisatoken';

    const api = API({
      getAccessToken,
    });

    await api.foo.bar();

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        actionName: 'bar',
        domainName: 'foo',
      }),
    );
  });

  it('should run the correct response plugins', async () => {
    fetch.once(JSON.stringify({ data: { id: '84845512', name: 'john', last_name: 'doe' } }), {
      headers: { 'content-type': 'application/json' },
    });

    const api = API({
      getAccessToken: () => 'thisisatoken', // async or sync function
      plugins: {
        response: [camelCase],
      },
    });

    const data = await api.contacts.info({ userId: '84989' }, { plugins: { response: [normalize] } });
    expect(data).toEqual({ contacts: { 84845512: { id: '84845512', lastName: 'doe', name: 'john' } } });
  });
});
