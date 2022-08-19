import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    output: {
      name: 'api',
      file: pkg.browser,
      format: 'umd',
    },
    input: 'src/main.ts',
    plugins: [
      resolve(),
      typescript(),
      babel({
        externalHelpers: false,
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
      commonjs({
        namedExports: {
          'node_modules/humps/humps.js': ['camelizeKeys', 'decamelizeKeys'],
        },
      }),
      terser(),
      bundleSize(),
    ],
  },
];
