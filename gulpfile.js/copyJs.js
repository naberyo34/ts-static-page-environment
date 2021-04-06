// JavaScript ファイルのlintとコピー

exports.copyJs = function copyJs(cb) {
  const { src, dest } = require('gulp');
  const eslint = require('gulp-eslint');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  src(config.src.js)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ JavaScript のビルドエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    // ESLint で引っかかった場合はエラーを表示
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    // 書き出し
    .pipe(dest(config.dest.js));

  // タスク完了
  cb();
};
