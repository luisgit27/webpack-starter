const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
 
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
                
            },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]  
            },
            {
                test: /styles\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]  
            },
            {
                test: /\.html$/i,
                use: [
                        { 
                            loader: 'html-loader',
                            options: {
                                minimize: true
                            }
                        }
                ]
            },
             {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                    esModule: false
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
    ]  
}