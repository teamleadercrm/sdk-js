import getRequestDomain from '../../src/utils/getRequestDomain';

describe('get request domain', () => {
  it('should extract the correct domain from the request url', () => {
    const requestUrl = 'http://mock.teamleader.api/contacts.list?include=company';

    expect(getRequestDomain(requestUrl)).toBe('contacts');
  });
});
