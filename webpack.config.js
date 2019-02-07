const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebPackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
});

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
});

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        filename: './app.js',
        path: __dirname + '/public',
        publicPath: '/public'
    },
    devServer:{
        contentBase: "./public",
        port: 3000,
        historyApiFallback: true,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "app.css"
        }),
        HtmlWebpackPluginConfig
    ],
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"]
    },
    module: {
        rules: [
            {
                test: /.js[x]?$/,
                exclude:  /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env', '@babel/preset-react'],
                      plugins: ['@babel/plugin-proposal-object-rest-spread', "@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader"
                  }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                            loader: "sass-loader",
                            options: {
                                minimize:true
                            }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: [ 'file-loader?name=[name].[ext]' ]
            },
            {
                test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,   //loader para fontes
                loader: 'file-loader'
            }
        ]
    }
}