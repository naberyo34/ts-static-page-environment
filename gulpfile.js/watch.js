// 対象ファイルの変更監視

exports.watch = function watch(cb) {
  const { series } = require('gulp');
  const { watch } = require('gulp');
  const { pug } = require('./pug');
  const { scss } = require('./scss');
  const { javaScript } = require('./javaScript');
  const { reload } = require('./server');
  const config = require('./config');

  // watch task 実行
  // series で コンパイル -> ホットリロードを実行
  watch(config.watch.pug, series(pug, reload));
  watch(config.watch.scss, series(scss, reload));
  // JSモードのときはJSのコピーも監視
  if (!config.useTs) {
    watch(config.watch.js, series(javaScript, reload))
  };

  // タスク完了
  cb();
};
