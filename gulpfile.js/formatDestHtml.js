// dest配下に書き出されるHTMLにprettierをかける

exports.formatDestHtml = function formatDestHtml(cb) {
  const { src, dest } = require('gulp');
  const prettier = require('gulp-prettier');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  src(config.src.destHtml)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ formatDestHtml のビルドエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    .pipe(prettier())
    .pipe(dest(config.dest.root));

  // タスク完了
  cb();
};
