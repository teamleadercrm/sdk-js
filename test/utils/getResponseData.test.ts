import getResponseData from '../../src/utils/getResponseData';

const response = ({
  ok,
  statusText,
  status,
  contentType,
  json,
  text,
}: Partial<{
  ok: boolean;
  statusText: string;
  status: number;
  contentType: string;
  json: Record<string, any>;
  text: string;
}>): Partial<Response> => {
  const headers = new Headers();
  headers.set('content-type', contentType || 'application/json');

  return {
    ok,
    headers,
    status,
    statusText,
    json: () => Promise.resolve(json),
    text: () => Promise.resolve(text || ''),
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

    const data = await getResponseData(testResponse as Response);
    expect(data).toEqual({ foo: 'bar' });
  });

  it('returns text when the response is type "application/text"', async () => {
    const testResponse = response({
      ok: true,
      contentType: 'application/text',
      text: 'test',
    });

    const data = await getResponseData(testResponse as Response);
    expect(data).toEqual('test');
  });
});
