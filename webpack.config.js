const path = require('path');

module.exports = {
  mode: 'development',
  entry: './_dev/js/index.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
  // 拡張子で利用するloaderを指定
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
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
