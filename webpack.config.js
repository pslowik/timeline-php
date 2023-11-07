const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env) => {
  // Ustaw, czy jesteś w trybie produkcyjnym, czy deweloperskim
  const isProduction = env.NODE_ENV === 'production';

  // Ustal, który plik .env powinien być używany
  const envFile = isProduction ? '.env.production' : '.env.development';

  // Wczytaj zmienne środowiskowe z odpowiedniego pliku
  const envPath = path.resolve(__dirname, envFile);
  const envVars = dotenv.config({ path: envPath }).parsed || {};

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
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
        template: './public/index.html',
        favicon: './public/favicon.ico',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
    ],
  };
};