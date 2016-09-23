const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APP = path.join(__dirname, '/app');
const BUILD = path.join(__dirname, '/build');
const STYLE = path.join(__dirname, '/app/style.css');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

const TEMPLATE = path.join(__dirname,'/app/templates/index_default.html');
const PostcssImport = require('postcss-easy-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const PROXY = 'http://' + HOST + ':' + PORT;

module.exports = {
	entry: {
		app: APP,
		style: STYLE
	},
	output: {
		path: BUILD,
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel?cacheDirectory'],
				include: APP
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css', 'postcss'],
				include: APP
			}
		]
	},
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		
		stats: 'errors-only',
		
		host: process.env.HOST,
		port: process.env.PORT,
		outputPath: BUILD
	},
	postcss: function () {
		return [precss, autoprefixer];
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: TEMPLATE,
			inject: 'body'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new BrowserSyncPlugin(
			{
				host: HOST,
				port: PORT,
				proxy: PROXY
			},
			{
				reload: false
			}
		),
	]
};