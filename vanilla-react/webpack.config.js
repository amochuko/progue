const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    mode: env,
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          // options: { preset: ['@babel/env'], cacheDirectory: true },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },

    devServer: {
      contentBase: path.join(__dirname, 'public/'),
      port: 3000,
      publicPath: 'http://localhost:3000/dist',
      hotOnly: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  };
};
