module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: [
    `${__dirname}/app/index.jsx`,
  ],

  output: {
    filename: 'application.js',
    path: `${__dirname}/dist/assets`,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
