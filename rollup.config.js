import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';

import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    output: {
      name: 'api',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(),
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
      uglify(),
      bundleSize(),
    ],
  },
];
