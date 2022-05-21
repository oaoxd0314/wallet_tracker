const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
	resolve: {
		fallback: {
			"os": require.resolve("os-browserify/browser"),
			"https": require.resolve("https-browserify"),
			"http": require.resolve("stream-http"),
			"crypto": require.resolve("crypto-browserify")
		}
	},
	plugins: [
		new NodePolyfillPlugin({
		  excludeAliases: ["console"]
		}),
	  ]
}