// pug のコンパイル

exports.pug = function pug(cb) {
  const { src, dest } = require('gulp');
  const pug = require('gulp-pug');
  const htmlhint = require('gulp-htmlhint');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  src(config.src.pug)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ pug のビルドエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    .pipe(
      // 引数には https://pugjs.org/api/reference.html 記載のコンパイル設定を渡せます
      pug()
    )
    // コンパイルが完了してからHTMLHintにかけ、引っかかった場合はエラーを表示
    .pipe(htmlhint())
    .pipe(htmlhint.failAfterError())
    // 書き出し
    .pipe(dest(config.dest.root));

  // タスク完了
  cb();
};
