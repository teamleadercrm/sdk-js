import { Plugin } from '../../types';
import applyPlugins from '../applyPlugins';

describe(`run plugins in sequence`, () => {
  it(`should return the transformed data after applyPlugins`, () => {
    const plugin1: Plugin = (data) => data + 1;
    const plugin2: Plugin = (data) => data + 2;

    expect(applyPlugins(1, [plugin1, plugin2, (data) => data - 3])).toEqual(1);
  });

  it(`should return the input when no array of plugins is provided`, () => {
    expect(applyPlugins(1)).toEqual(1);
  });
});
