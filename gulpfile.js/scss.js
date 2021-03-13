// SCSS のコンパイル

exports.scss = function scss(cb) {
  const { src, dest } = require('gulp');
  const scss = require('gulp-dart-sass');
  const stylelint = require('gulp-stylelint');
  const autoprefixer = require('gulp-autoprefixer');
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');
  const config = require('./config');

  // 全ファイルに対してstylelintをかける
  src(config.src.allScss)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ scss のビルドエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    .pipe(
      stylelint({
        failAfterError: true,
        reporters: [{ formatter: 'string', console: true }],
      })
    );

  // 非モジュールファイルのみコンパイルする
  src(config.src.scss)
    .pipe(
      plumber(
        notify.onError(
          '⚠️ scss のビルドエラーが出ています ⚠️ <%= error.message %>'
        )
      )
    )
    .pipe(
      // 引数には https://github.com/mattdsteele/gulp-dart-sass#options 記載のコンパイル設定を渡せます
      scss({
        /**
         * 圧縮設定
         * compressed: 圧縮する
         */
      })
    )
    .pipe(
      // autoprefixer
      // 引数には https://github.com/postcss/autoprefixer#options 記載の設定が渡せます
      autoprefixer({
        // 非圧縮cssの場合はtrueにする
        cascade: false,
      })
    )
    .pipe(dest(config.dest.css));

  // タスク完了
  cb();
};
