const webpack = require('webpack'); 
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
	devtool: 'source-map',
	entry: {
		filename: './apps.js'
	},
	output: {
		filename: '_build/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presents: ['es2015-native-modules']
				}
			}
		]
	}
};