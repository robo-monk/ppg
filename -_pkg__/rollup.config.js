import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import { terser } from "rollup-plugin-terser"

import sizes from 'rollup-plugin-sizes';
import json from '@rollup/plugin-json';
import visualizer from 'rollup-plugin-visualizer'
import pkg from './package.json';

console.log("[ BUNDLING ] @ ", process.env["-_pkg___ENV"])

const env = process.env["-_pkg___ENV"]
const prod = (env=='production' || env == 'prod')

function ifProd(plug, params){
  return prod ? plug(params) : null
}

const plugs = [
  ifProd(terser), // mini
  ifProd(sizes),
  json(),
  ifProd(visualizer,{
    filename: "docs/stats.html",
    title: "-_pkg__ Visualised",
    sourcemap: false
  })
]


export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    //external: ['tippy', 'mousetrap', 'animejs' ],
    output: [{
      name: '-_pkg__',
      file: pkg.browser,
      format: 'umd'
    }, {
      name: '-_pkg__',
      file: "docs/scripts/-_pkg__.umd.js",
      format: 'umd'
    }],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module

    ].concat(plugs)
  },
  {
    input: 'src/index.js',
    external: [ 'ms' ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      // terser()
    ].concat(plugs)
  }
]

