babel 编译的过程分为三步：

- parser：通过 babylon 解析成 AST
- transform[s]：All the plugins/presets ，进一步的做语法等自定义的转译，仍然是 AST
- generator： 最后通过 babel-generator 生成 output string

plugins/presets 是在第二步自定义转译的，所以如果自己写个 plugin，就是对 ast 结构做一个遍历、操作。