const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
	entry: './src/index.tsx',
	output: {
		filename: 'mfe-login.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: argv.mode === 'production' ? '/mfe-login/' : 'http://localhost:4001/',
		libraryTarget: 'system', // ⭐ SystemJS format
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
	externals: ['react', 'react-dom'], // ⭐ Não bundlar, importar do shell
	devServer: {
		port: 4001,
		headers: { 'Access-Control-Allow-Origin': '*' }, // ⭐ CORS
		hot: false, // HMR não funciona bem com SystemJS
	},
});
