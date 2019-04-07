../node_modules/.bin/babel src/script.js -o dist/script.js
../node_modules/.bin/babel src/delay.js -o dist/delay.js

../node_modules/.bin/webpack


babel-runtime由三个部分组成：

- core-js
- regenerator
- helpers