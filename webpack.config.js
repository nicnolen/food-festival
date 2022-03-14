const path = require('path');
const webpack = require('webpack');

// Create the main configuration object
module.exports = {
  // relative path to the clients code
  entry: './assets/js/script.js', // entry point is the root of the bundle and the beginning of the dependency graph.
  // output the bundled code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  // use plugins to direct the webpack what to do
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  // mode you want webpack to run in
  mode: 'development',
};
