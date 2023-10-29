const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.(png|jpe?g)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          use: ['svg-url-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader",
          ],  
        },
      ],
    },
  //add server
  devServer: {
    port: 8001,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
        favicon: './public/favicon.ico',
    }),
  ],
};