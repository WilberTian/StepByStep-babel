
var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        './src/script.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    }
}