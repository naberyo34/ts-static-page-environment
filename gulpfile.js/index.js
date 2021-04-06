const { series, parallel } = require('gulp');
// 各種ビルドタスク
const { pug } = require('./pug');
const { scss } = require('./scss');
const { copyJs } = require('./copyJs');
const { webpackDev } = require('./webpackDev');
const { webpackBuild } = require('./webpackBuild');
const { images } = require('./images');
// フォーマット
const { formatDestHtml } = require('./formatDestHtml');
// 変更監視とプレビューの起動
const { watch } = require('./watch');
const { server } = require('./server');
// コンフィグ
const config = require('./config');
const jsCompileDev = config.useWebpack ? webpackDev : copyJs;
const jsCompileBuild = config.useWebpack ? webpackBuild : copyJs;

// 並行で各種buildタスクを実行し、完了後にローカルサーバーを起動
exports.default = series(
  parallel(pug, scss, jsCompileDev, images, watch),
  server
);

// build コマンドでは、サーバーを立てずにビルドとHTMLのフォーマットのみを実行
exports.build = series(
  parallel(pug, scss, jsCompileBuild, images),
  formatDestHtml
);
