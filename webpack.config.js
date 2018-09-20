// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
};

export default {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './lib'),
        library: 'react-cloud-popup-panel-mobile',
        libraryTarget: 'umd',
        filename: 'index.js'
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        // Generate an external css file with a hash in the filename
        // new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.DefinePlugin({
            // 消除警告
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-1']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
