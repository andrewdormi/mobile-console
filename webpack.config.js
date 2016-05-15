var webpack = require('webpack');

var BUILD_PATH = './';

module.exports = {
    entry: './src/index.js',
    output: {
        path: BUILD_PATH,
        filename: 'index.min.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};