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
  it('returns json when the response is type "application/json"', () => {
    const testResponse = response({
      ok: true,
      contentType: 'application/json',
      json: {
        foo: 'bar',
      },
    });

    getResponseData(testResponse).then(data => expect(data).toEqual({ foo: 'bar' }));
  });

  it('returns text when the response is type "application/text"', () => {
    const testResponse = response({
      ok: true,
      contentType: 'application/text',
      text: 'test',
    });

    getResponseData(testResponse).then(data => expect(data).toEqual('test'));
  });
});
