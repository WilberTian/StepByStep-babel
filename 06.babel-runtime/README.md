../node_modules/.bin/babel src -d dist


babel-runtime由三个部分组成：

- core-js
- regenerator
- helpers



["transform-runtime", {
    "helpers": true,
    "polyfill": true,
    "regenerator": true
}]