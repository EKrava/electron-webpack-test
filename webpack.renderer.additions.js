// var stylus_plugin = require('stylus_plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {         
       test: /\.png$/i,
       use: [
        {
         loader: 'file-loader',
         options: {
         name: 'images/[name]-[hash].[ext]',
         }, 
        },
       ],
      },
      {
        // If you see a file that ends in .html, send it to these loaders.
        test: /\.html$/,
        // This is an example of chained loaders in Webpack.
        // Chained loaders run last to first. So it will run
        // polymer-webpack-loader, and hand the output to
        // babel-loader. This let's us transpile JS in our `<script>` elements.
        use: [
          {
            loader: 'babel-loader',
            options: {
             presets: ['@babel/preset-env'],
            },
            // Optionally exclude node_modules from transpilation except for polymer-webpack-loader:
            // exclude: /node_modules\/(?!polymer-webpack-loader\/).*/
          },
          { loader: 'polymer-webpack-loader' },
        ],
      },
    ],
   },

 plugins: [
   new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/renderer/index.ejs'),
    }),
    // This plugin will copy files over for us without transforming them.
    // That's important because the custom-elements-es5-adapter.js MUST
    // remain in ES2015.
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/*.js'),
      to: 'node_modules/@webcomponents/webcomponentsjs/[name].[ext]',
    }]),
    ],
}

