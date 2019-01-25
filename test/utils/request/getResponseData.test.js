import getResponseData from '../../../src/utils/request/getResponseData';

const response = ({ ok, statusText, status, contentType, json, text }) => {
  const headers = new Map();
  headers.set('content-type', contentType);

  return {
    ok,
    headers,
    status,
    statusText,
    json: () => Promise.resolve(json),
    text: () => Promise.resolve(text),
  };
};

describe('getResponseData', () => {
  it('returns json when the response is type "application/json"', async () => {
    const testResponse = response({
      ok: true,
      contentType: 'application/json',
      json: {
        foo: 'bar',
      },
    });

    const data = await getResponseData(testResponse);
    expect(data).toEqual({ foo: 'bar' });
  });

  it('returns text when the response is type "application/text"', async () => {
    const testResponse = response({
      ok: true,
      contentType: 'application/text',
      text: 'test',
    });

    const data = await getResponseData(testResponse);
    expect(data).toEqual('test');
  });
});
