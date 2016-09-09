const webpack = require('webpack')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const paths = [
	'/',
]

module.exports = {
	entry: {
		server: './app/server.js',
		client: './app/client.js',
	},
	output: {
		filename: '[name].js',
		path: 'dist',
		libraryTarget: 'umd',
	},
	plugins: [
		new StaticSiteGeneratorPlugin('server', paths),
		new ExtractTextPlugin('[name].css'),
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
			},
			{
				test: /\.ejs$/,
				loader: 'ejs-compiled',
			},
			{
				test: /\.pcss$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:8]!postcss-loader'
				),
			},
		],
	},
	postcss: [
		require('postcss-import')({addDependencyTo: webpack}),
		require('postcss-custom-media'),
		require('postcss-nested'),
		require('postcss-inline-svg')({path: 'assets/images/'}),
		require('postcss-assets')({
			loadPaths: ['assets/'],
			basePath: 'assets/',
			cachebuster: true,
		}),
		require('postcss-svgo'),
		require('postcss-css-variables'),
		require('postcss-calc'),
		require('autoprefixer'),
	],
}
