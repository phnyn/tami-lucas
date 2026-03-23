// If IE11 support is required, please comment in the three blocks regarding support in this config file

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rollup/plugin-eslint';
import strip from '@rollup/plugin-strip';
import analyze from 'rollup-plugin-analyzer';
import json from '@rollup/plugin-json';
// 1. If IE11 support is required, comment in the following import statement line for babel
// import babel from '@rollup/plugin-babel';

const isProduction = process.env.NODE_ENV === 'production';

export default [{
    input: ['Private/Frontend/Scripts/main.js', 'Private/Frontend/Scripts/sub.js'],
    external: ['express'],
    output: [
        {
            format: 'es',
            dir: isProduction ? 'public/Scripts/' : 'public/Scripts/Dev',
            sourcemap: isProduction ? false : true,
        },
// 2. If IE11 support is required, comment in the following output format block
        // {
        //     format: 'systemjs',
        //     dir: isProduction ? 'Public/Scripts/Legacy' : 'Public/Scripts/Legacy/Dev',
        //     sourcemap: isProduction ? false : true,
        // }
    ],
    watch: {
        clearScreen: false
    },
    plugins: [
        eslint({
            fix: true,
            exclude: [
                'src/styles/**',
                'node_modules/**'
            ]
        }),
        json(),
        resolve({
            preferBuiltins: false,
            browser: true
        }),
// 3. If IE11 support is required, comment in the following babel plugin block
        // babel({
        //     babelHelpers: 'bundled',
        //     exclude: 'node_modules/core-js/**',
        // }),
        commonjs(),
        isProduction && strip(),
        isProduction && terser(),
        isProduction && analyze({
            summaryOnly: true
        }),
    ]
}];
