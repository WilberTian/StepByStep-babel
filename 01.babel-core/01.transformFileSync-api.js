var babel = require('babel-core')
var path = require('path')

var result = babel.transformFileSync(path.resolve(__dirname) + '/script.js', {
  babelrc: false,
})

console.log(result.code)
