const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
 
    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
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
                                minimize: false
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
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CleanWebpackPlugin()
    ]  
}