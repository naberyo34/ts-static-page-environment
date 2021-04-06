const path = require('path');

module.exports = {
  mode: 'production',
  entry: './_dev/js/index.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
  // 拡張子で利用するloaderを指定
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  target: ['web', 'es5'],
  // importの解決方法を決める
  resolve: {
    // 拡張子省略の有効化
    extensions: ['.ts', '.js'],
    // 絶対パスimportのエイリアス
    alias: {
      '@': path.resolve(__dirname, '_dev/js'),
    },
  },
};
