var babel = require('babel-core')
var path = require('path')

var result = babel.transformFileSync(path.resolve(__dirname) + '/script.js')

console.log(result.code)
