import call from '../../src/utils/call';

const mockFetch = desiredResponse => window.fetch = () => Promise.resolve(desiredResponse);
const response = ({ ok, statusText, status, contentType, json, text }) => {
  const headers = new Map();
  headers.set('content-type', contentType);

  return {
    ok,
    headers,
    status,
    statusText,
    json: () => Promise.resolve(json),
    text: () => Promise.resolve(text)
  };
};

describe('fetch response handling', () => {
  it('returns json when the response was successful', () => {
    mockFetch(response({
      ok: true,
      contentType: 'application/json',
      json: { foo: 'bar' }
    }));

    call().then(jsonResponse => {
      expect(jsonResponse).toEqual({
        foo: 'bar'
      });
    })
  });

  it('returns text when the response was successful', () => {
    mockFetch(response({
      ok: true,
      contentType: 'text/plain',
      text: 'foo bar'
    }));

    call().then(textResponse => {
      expect(textResponse).toEqual('foo bar');
    })
  });

  it('throws an error with json if the response was unsuccessful', () => {
    mockFetch(response({
      ok: false,
      contentType: 'application/json',
      json: { errors: [
        'There was an error'
      ] },
      status: 500,
      statusText: 'There was an error 500'
    }));

    call().catch(e => {
      expect(e.status).toEqual(500);
      expect(e.statusText).toEqual('There was an error 500');
      expect(e.message).toEqual('There was an error 500');
      expect(e.body).toEqual({ errors: [
        'There was an error'
      ] });
    });
  });

  it('throws an error with text if the response was unsuccessful', () => {
    mockFetch(response({
      ok: false,
      contentType: 'text/plain',
      text: 'There was an error',
      status: 500,
      statusText: 'There was an error 500'
    }));

    call().catch(e => {
      expect(e.status).toEqual(500);
      expect(e.message).toEqual('There was an error 500');
      expect(e.statusText).toEqual('There was an error 500');
      expect(e.body).toEqual('There was an error');
    });
  });
});
