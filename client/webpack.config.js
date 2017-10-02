const webpack = require('webpack')

module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        include: __dirname + '/app',
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-2']
            }
          }, {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              failOnError: false
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL)
    })
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: './',
    inline: true
  },
}