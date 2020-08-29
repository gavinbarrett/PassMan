module.exports = {
	entry: './src/App.jsx',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			}
		]
	},
	target: "electron-main",
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		filename: 'App.js',
		path: __dirname + '/dist',
	},
};
