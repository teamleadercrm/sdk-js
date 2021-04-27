import mergeHeaders from '../../src/utils/mergeHeaders';

describe(`merge headers`, () => {
  it(`should merge the headers in a correct way`, () => {
    const globalHeaders = {
      'x-header-1': 'headerValue1',
      'x-header-2': 'headerValue2',
    };

    const localHeaders = {
      'x-header-3': 'headerValue3',
      'x-header-4': 'headerValue4',
    };

    const headers = mergeHeaders(globalHeaders, localHeaders);

    const expectedHeaders = {
      'x-header-1': 'headerValue1',
      'x-header-2': 'headerValue2',
      'x-header-3': 'headerValue3',
      'x-header-4': 'headerValue4',
    };

    expect(headers).toEqual(expectedHeaders);
  });

  it(`should merge the headers in a correct way when one header object is given`, () => {
    const globalHeaders = {
      'x-header-1': 'headerValue1',
      'x-header-2': 'headerValue2',
    };

    const headers = mergeHeaders(globalHeaders);

    const expectedHeaders = {
      'x-header-1': 'headerValue1',
      'x-header-2': 'headerValue2',
    };

    expect(headers).toEqual(expectedHeaders);
  });

  it(`should merge the headers in a correct way when one header object is invalid`, () => {
    const globalHeaders = {
      'x-header-1': 'headerValue1',
      'x-header-2': 'headerValue2',
    };

    const localHeaders = 'invalid';

    const headers = mergeHeaders(globalHeaders, localHeaders);

    const expectedHeaders = {
      'x-header-1': 'headerValue1',
      'x-header-2': 'headerValue2',
    };

    expect(headers).toEqual(expectedHeaders);
  });

  it(`should merge the headers in a correct way when header objects are undefined`, () => {
    const headers = mergeHeaders(undefined, undefined);

    expect(headers).toEqual({});
  });
  it(`should merge the headers in a correct way when one header object is invalid`, () => {
    const globalHeaders = {
      'x-header-1': 'headerValue1',
      'x-header-2': 'headerValue2',
    };

    const localHeaders = 'invalid';

    const headers = mergeHeaders(globalHeaders, localHeaders);

    const expectedHeaders = {
      'x-header-1': 'headerValue1',
      'x-header-2': 'headerValue2',
    };

    expect(headers).toEqual(expectedHeaders);
  });
});
