const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // Analyze bundle sizes to see how much JavaScript is being processed by the browser
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
        test: /\.(png|jpe?g|gif)$/i, // find any image file with a .jpg extension
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
    new WebpackPwaManifest({
      name: 'Food Event', // name that will show up next to the app's icon on desktop devices
      short_name: 'Foodies', //name that will appear on a user's home screen when the application has been downloaded
      description: 'An app that allows you to view upcoming food events.',
      start_url: '../index.html', // specifies homepage
      background_color: '#01579b',
      theme_color: '#ffffff', // color of the tool bar
      fingerprints: false, // tell webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated, it looks like this: manifest.lhge325d.json
      inject: false, // determines whether the link to the manifest.json is added to the HTML
      icons: [
        {
          src: path.resolve('assets/img/icons/icon-512x512.png'), // path to the icon image
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'), // where the icons will be sent
        }, // icons for the buttons users see on their home screen
      ],
    }),
  ],
  // mode you want webpack to run in
  mode: 'development',

  devServer: {
    static: './',
  },
};
