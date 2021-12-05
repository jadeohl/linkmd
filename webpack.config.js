const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		popup: './src/popup.js'
	},
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/manifest.json' },
				{ from: './src/popup.html' },
				{ from: './src/icons/icon-64.png' },
				{ from: './src/icons/icon-128.png' },
			],
		}),
	],
	output: {
		filename: '[name].js', path: path.resolve(__dirname, 'dist')
	}
};