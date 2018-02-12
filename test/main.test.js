import API from '../src/main';

describe(`returns the correct value`, () => {
  it(`returns hello`, () => {
    expect(API()).toEqual('hello');
  });
});
