import checkStatus from '../checkStatus';
import FetchError from '../FetchError';

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

describe('checkStatus', () => {
  it('returns the data on true status', async () => {
    const testResponse = response({
      ok: true,
      contentType: 'application/json',
      json: { data: 'this is correct' },
    });

    const data = await checkStatus(testResponse as Response);
    expect(data).toEqual({ data: 'this is correct' });
  });

  it('throws an error on false status', async () => {
    const testError = new FetchError(404, 'Not found.', { error: 'this is an error' });

    const testResponse = response({
      ok: false,
      status: 404,
      statusText: 'Not found.',
      contentType: 'application/json',
      json: { error: 'this is an error' },
    });

    try {
      await checkStatus(testResponse as Response);
    } catch (error) {
      expect(error).toEqual(testError);
    }
  });
});
