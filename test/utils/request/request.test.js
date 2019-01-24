import request from '../../../src/utils/request';
import { camelCase } from '../../../src/main';

const mockFetch = desiredResponse => (window.fetch = () => Promise.resolve(desiredResponse));
const response = ({ ok, statusText, status, contentType, json, text }) => {
  const headers = new Map();
  headers.set('content-type', contentType);

  return {
    ok,
    headers,
    status,
    statusText,
    json: () => Promise.resolve(json),
  };
};

describe('fetch response handling', () => {
  it('returns json when the response was successful', () => {
    mockFetch(
      response({
        ok: true,
        contentType: 'application/json',
        json: { foo: 'bar' },
      }),
    );

    request().then(jsonResponse => {
      expect(jsonResponse).toEqual({
        foo: 'bar',
      });
    });
  });

  it('returns the correct data after running the plugins', () => {
    mockFetch(
      response({
        ok: true,
        contentType: 'application/json',
        json: { data: { user_id: 'bar' } },
      }),
    );

    request(undefined, undefined, { plugins: { response: [camelCase] } }).then(jsonResponse => {
      expect(jsonResponse).toEqual({ data: { userId: 'bar' } });
    });
  });

  it('returns the correct data with fetchAll enabled', () => {
    mockFetch(
      response({
        ok: true,
        contentType: 'application/json',
        json: { data: { user_id: 'bar' } },
      }),
    );

    request(undefined, undefined, { plugins: { response: [camelCase] }, fetchAll: true }).then(jsonResponse => {
      expect(jsonResponse).toEqual({
        data: [
          { name: 'John', lastName: 'Doe' },
          { name: 'Alex', lastName: 'Turner' },
          { name: 'William', lastName: 'Hurt' },
        ],
      });
    });
  });

  it('throws an error with json if the response was unsuccessful', () => {
    mockFetch(
      response({
        ok: false,
        contentType: 'application/json',
        json: {
          errors: ['There was an error'],
        },
        status: 500,
        statusText: 'There was an error 500',
      }),
    );

    request().catch(e => {
      expect(e.status).toEqual(500);
      expect(e.statusText).toEqual('There was an error 500');
      expect(e.message).toEqual('There was an error 500');
      expect(e.body).toEqual({
        errors: ['There was an error'],
      });
    });
  });
});
