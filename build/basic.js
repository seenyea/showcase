const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const releasePath = path.join(__dirname, '../dist');
const entryJs = path.join(__dirname, '../src/app.js');
const htmlTemplate = path.join(__dirname, '../src/index.html');

module.exports = {
    entry: entryJs,
    output: {
        path: releasePath,
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: htmlTemplate
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.css' ],
        modules: ['src', 'node_modules', 'store', 'moudles', 'comps', 'utils'],
        alias: {
            'ant-css' : '../node_modules/antd/dist'
        }
    }
}