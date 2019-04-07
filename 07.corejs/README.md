### 通过core-js实现按需引入polyfill或runtime
core-js包才上述的polyfill、runtime的核心，因为polyfill和runtime其实都只是对core-js和regenerator的再封装，方便使用而已。
但是polyfill和runtime都是整体引入的，不能做细粒度的调整，如果我们的代码只是用到了小部分ES6而导致需要使用polyfill和runtime的话，会造成代码体积不必要的增大（runtime的影响较小）。所以，按需引入的需求就自然而然产生了，这个时候就得依靠core-js来实现了。


#### core-js的组织结构
首先，core-js有三种使用方式：

- 默认方式：require('core-js')
这种方式包括全部特性，标准的和非标准的

- 库的形式： var core = require('core-js/library')
这种方式也包括全部特性，只是它不会污染全局名字空间

- 只是shim： require('core-js/shim')或var shim = require('core-js/library/shim')
这种方式只包括标准特性（就是只有polyfill功能，没有扩展的特性）

core-js的结构是高度模块化的，它把每个特性都组织到一个小模块里，然后再把这些小模块组合成一个大特性，层层组织。比如：
core-js/es6（core-js/library/es6）就包含了全部的ES6特性，而core-js/es6/array（core-js/library/es6/array）则只包含ES6的Array特性，而core-js/fn/array/from（core-js/library/fn/array/from）则只有Array.from这个实现。  
实现按需使用，就是自己选择使用到的特性，然后导入即可。具体的每个特性和对应的路径可以直接查看core-js的github


#### core-js的按需使用

1. 类似polyfill，直接把特性添加到全局环境，这种方式体验最完整

        require('core-js/fn/set');
        require('core-js/fn/array/from');
        require('core-js/fn/array/find-index');

        Array.from(new Set([1, 2, 3, 2, 1])); // => [1, 2, 3]
        [1, 2, NaN, 3, 4].findIndex(isNaN);   // => 2

2. 类似runtime一样，以库的形式来使用特性，这种方式不会污染全局名字空间，但是不能使用实例方法

        var Set       = require('core-js/library/fn/set');
        var from      = require('core-js/library/fn/array/from');
        var findIndex = require('core-js/library/fn/array/find-index');

        from(new Set([1, 2, 3, 2, 1]));      // => [1, 2, 3]
        findIndex([1, 2, NaN, 3, 4], isNaN); // => 2

3. 因为第二种库的形式不能使用prototype方法，所以第三种方式使用了一个小技巧，通过::这个符号而不是.来调用实例方式，从而达到曲线救国的目的。这种方式的使用，路径中都会带有/virtual/

        import {fill, findIndex} from 'core-js/library/fn/array/virtual';

        Array(10)::fill(0).map((a, b) => b * b)::findIndex(it => it && !(it % 8)); // => 4

        // 对比下polyfill的实现 
        // Array(10).fill(0).map((a, b) => b * b).findIndex(it => it && !(it % 8));
