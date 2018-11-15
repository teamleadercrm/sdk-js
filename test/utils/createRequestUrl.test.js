import createRequestUrl from '../../src/utils/createRequestUrl';

describe(`create request url`, () => {
  const baseUrl = 'https://api.teamleader.eu';
  const domainName = 'contacts';
  const actionName = 'list';

  it(`should return the correct url`, async () => {
    const requestUrl = await createRequestUrl({ baseUrl, domainName, actionName });
    expect(requestUrl).toEqual(`https://api.teamleader.eu/${domainName}.${actionName}`);
  });
});
