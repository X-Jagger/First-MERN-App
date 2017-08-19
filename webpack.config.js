const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: {
		app: ['./src/App.jsx'],
		vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router'],
	},
	output: {
		path: path.resolve(__dirname, 'static'),
		filename: 'app.bundle.js'
	},
	//把libraries打包起来
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js'
		})
	],
	//下面的是babel转换
	module: {
		loaders: [{
			test: /\.jsx$/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015']
			}
		}, ]
	},
	//web-dev-server
	//proxy for interact with express,只用打开 'http://localhost:8000'
	devServer: {
		port: 8000,
		contentBase: 'static',
		proxy: {
			'/api/*': {
				target: 'http://localhost:3000'
			}
		},
		historyApiFallback: true,
	},
	devtool: 'source-map'
};