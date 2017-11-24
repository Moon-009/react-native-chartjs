const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    entry : {
        index : './web/chart.js'
    },
    output : {
        path : path.join(__dirname, 'dist'),
        filename : '[name].bundle.js'
    },
    resolve : {
        alias : {
            myChart : 'Chart.bundle.min.js'
        },
        modules: [
            path.resolve(__dirname, './web/lib')
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './web/chart.html',
            inlineSource : '.js$',
            cache : false, 
        }),
        new HtmlWebpackInlineSourcePlugin()
    ]
}
