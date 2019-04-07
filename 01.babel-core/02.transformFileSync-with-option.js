var babel = require('babel-core');
var path = require('path');

var result = babel.transformFileSync(path.resolve(__dirname) + "/script.js", {
    babelrc: false,
    plugins: ['transform-es2015-arrow-functions', 'transform-async-to-generator', 'transform-es2015-modules-commonjs']
});

console.log(result.code);

console.log('----------------------------------------------------------------------')

var result = babel.transformFileSync(path.resolve(__dirname) + "/script.js", {
    babelrc: false,
    presets: ['env']
});

console.log(result.code);
