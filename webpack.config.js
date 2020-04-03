const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: __dirname + "/src/js/index.js",
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
    },
    plugins: [new htmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html'
        }),
        new webpack.BannerPlugin('123')
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test: /\.jpg$/,
            //     loader: "file-loader",
            //     options:{
            //         esModule: false
            //     }
            // }, {
            //     test: /\.png$/,
            //     loader: "url-loader?mimetype=image/png"
            // }, 
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:7].[ext]',
                        outputPath: './images/',
                        limit: 16940,
                        esModule: false
                    }
                }

            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {

                test: /\.art$/,
                use: [{
                    loader: 'art-template-loader',
                    options: {
                        htmlResourceRoot: __dirname,
                        root: path.resolve(__dirname)
                    }
                }]

            }
        ]
    },
    watch: true
}