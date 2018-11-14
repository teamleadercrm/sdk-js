import createRequestUrl from '../../src/utils/createRequestUrl';

describe(`create request url`, () => {
  const configuration = {
    baseUrl: 'https://api.teamleader.eu',
  };

  const domainName = 'contacts';
  const actionName = 'list';

  it(`should return the correct url`, async () => {
    const requestUrl = await createRequestUrl({ configuration, domainName, actionName });
    expect(requestUrl).toEqual(`https://api.teamleader.eu/${domainName}.${actionName}`);
  });
});
