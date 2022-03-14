const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // Analyze bundle sizes to see how much JavaScript is being processed by the browser

// Create the main configuration object
module.exports = {
  // relative path to the clients code
  entry: {
    app: './assets/js/script.js', // entry point is the root of the bundle and the beginning of the dependency graph.
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js',
  },
  // output the bundled code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // name  of each attribute in the entry object will be used in place of `name` in each `bundle.js` file created
  },
  // use module to direct what the webpack does to non javascript files
  module: {
    rules: [
      {
        test: /\.jpg$/i, // find any image file with a .jpg extension
        // use is where the actual loader is implemented
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function (url) {
                return url.replace('../', '/assets/');
              },
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  // use plugins to direct the webpack what to do to javascript files
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
    }),
  ],
  // mode you want webpack to run in
  mode: 'development',
};
