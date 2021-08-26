const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => [
  {
    test: /\.node$/,
    use: [
      {
        loader: "node-addon-loader",
        options: {
          basePath: './'
        },
      }
    ] 
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
      },
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          outputPath: 'public/img/',
          name: '[name].[ext]',
          limit: 10240,
        },
      },
      // {
      //   loader: 'image-webpack-loader',
      //   options: {
      //     disable: process.env.NODE_ENV !== 'production',
      //   },
      // },
    ],
  },
  {
    test: /\.(ogg|mp3|wav|mpe?g)/i,
    use: 'file-loader',
  },
  {
    test: /\.scss$/,
    use: [
      argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
];
