import flow from '../../src/utils/flow';

describe(`run functions in sequence`, () => {
  it(`should return the transformed data after a flow`, () => {
    const plugin1 = data => data + 1;
    const plugin2 = data => data + 2;

    expect(flow(1, [plugin1, plugin2, data => data - 3])).toEqual(1);
  });

  it(`should return the input when no array of functions is provided`, () => {
    expect(flow(1)).toEqual(1);
  });
});
