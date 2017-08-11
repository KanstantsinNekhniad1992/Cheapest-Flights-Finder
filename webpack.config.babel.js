'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 3333,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'dist/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader']}
        ]
    }
};