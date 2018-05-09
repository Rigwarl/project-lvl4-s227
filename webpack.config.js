const babelOptions = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-stage-0', {
      decoratorsLegacy: true,
    }],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
};

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

  externals: {
    gon: 'gon',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
