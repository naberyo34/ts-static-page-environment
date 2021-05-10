// EJS のコンパイル

exports.ejs = function ejs(cb) {
  const { src, dest } = require('gulp');
  const ejs = require('gulp-ejs');
  const htmlhint = require('gulp-htmlhint');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const rename = require('gulp-rename');
  const config = require('./config');

  src(config.src.ejs)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ EJS のビルドエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    .pipe(
      // 引数詳細は https://github.com/rogeriopvl/gulp-ejs
      ejs()
    )
    .pipe(rename({ extname: '.html'}))
    // コンパイルが完了してからHTMLHintにかけ、引っかかった場合はエラーを表示
    .pipe(htmlhint())
    .pipe(htmlhint.failAfterError())
    // 書き出し
    .pipe(dest(config.dest.root));

  // タスク完了
  cb();
};
