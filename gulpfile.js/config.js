// コンフィグ

module.exports = {
  // ビルド対象ファイルのパス
  src: {
    root: './_dev',
    pug: ['./_dev/pug/**/*.pug', '!./_dev/pug/**/_*.pug'],
    ejs: ['./_dev/ejs/**/*.ejs', '!./_dev/ejs/**/_*.ejs'],
    scss: ['./_dev/scss/**/*.scss', '!./_dev/scss/**/_*.scss'],
    // モジュールのscssファイルも対象に含めたいときはこちらを指定(lintなど)
    allScss: ['./_dev/scss/**/*.scss', '!./_dev/scss/**/_reset.scss'],
    js: './_dev/js/**/*.{js,ts}',
    // lib 配下のjsを対象に含めたくないときはこちらを指定
    userJs: ['./_dev/js/**/*.{js,ts}', '!./_dev/js/lib/*.js'],
    images: './_dev/images/**/*',
    destHtml: './dist/**/*.html',
  },
  // ビルドファイルの出力先パス
  dest: {
    root: './dist/',
    css: './dist/assets/css/',
    js: './dist/assets/js/',
    images: './dist/assets/images/',
  },
  // フォーマットファイルの出力先パス
  format: {
    pug: './_dev/pug/',
    ejs: './_dev/ejs/',
    scss: './_dev/scss/',
    js: './_dev/js/',
  },
  // ウォッチ設定
  watch: {
    pug: './_dev/pug/**/*.pug',
    ejs: './_dev/pug/**/*.ejs',
    scss: './_dev/scss/**/*.scss',
    js: './_dev/js/**/*.{js,ts}',
  },
  // ローカルサーバー
  server: {
    port: 3000,
    // 起動時に表示するパスを変えたい場合はここを変更しましょう
    startPath: './',
  },
  // webpack とか ejs 使うか設定
  useWebpack: true,
  useEjs: false,
};
