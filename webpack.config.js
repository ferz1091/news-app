const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    entry: './src/index.tsx',
    plugins: [
        new HTMLWebpackPlugin({ template: './public/index.html', minify: {collapseWhitespace: isProd, removeComments: isProd }}),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public/favicon.ico'),
                    to: path.resolve(__dirname, 'dist/public')
                },
                {
                    from: path.resolve(__dirname, './public/manifest.json'),
                    to: path.resolve(__dirname, 'dist/public')
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
}
