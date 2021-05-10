ts-static-page-environment 詳細解説

# 概要

基本的な利用方法については README.md に記載しています。こちらでは、環境のカスタマイズを行う場合など中級者向けの内容を記載しています。

# 環境の構築方針について

本環境は、ビルド時の成果物をプレーンな HTML/CSS/JS の形とすることを原則としています。webpack による CSS、画像の JS バンドル等は行いません。

タスク制御には原則 gulp を利用し、webpack は ts-loader および babel-loader によるコンパイルタスクのみを担当させる方針をとっています。

gulp の`webpack-stream`を利用し、gulp タスク下で webpack を動作させています。

gulp を利用している都合上、メンテナンスされていないパッケージが今後も増加する懸念があり、できるだけ最小限の機能を実現するためのプラグインのみを導入する方針で構築しています。

# 各種 linter の設定について

## ESLint

原則`airbnb`のルールを採用しています。

### TypeScript

- airbnb-typescirpt/base

### JavaScript (ESNext)

- airbnb/base (base は React を利用しない環境向けのルールです)

### JavaScript (ES5)

- airbnb-base/legacy (ES5 向けルール)

### 注意点

現状、ESLintの設定値についてはツメが甘いです。推奨されるパッケージ選択等を確認しきれていません。また、上記の設定値のうち利用しづらい設定などの調整ができていない状況です。運用中に使いづらいルールがあった場合には、適宜`.eslintrc`の設定変更を行ってください。

## stylelint

公式提供の最も厳格なルール`stylelint-config-standard`を基盤に、Twitter 社のプロパティオーダールール`stylelint-config-recess-order`を追加しています。

プロパティを手動で並べ替えるのは煩雑なため、VSCodeの利用者は、VSCode側の設定でセーブ時にautoformatが走る設定にしておくことを推奨します。

### 注意点

`.stylelintrc`の`IgnoreAtRules`には SCSS で頻繁に利用されているものを設定していますが、足りない場合は適宜追加してください。

## HTML の lint / バリデーション について

現状、HTML バリデーションに関連するパッケージはgulp内で実行する`htmlhint`のみです。(pug / EJS を直接バリデーションできるパッケージは少なく、方針を検討中のためです)

# prettier の設定について

原則的に`airbnb`のESLintルールに倣い、
- インデントはスペース2つ
- 末尾のセミコロンあり
- シングルクォート

を採用しています。お好みの設定がある場合は適宜変更してください。

# editorconfig の設定について

prettierと競合しないよう、同様の内容を指定しています。

# gulpfile.jsの構成について

`gulpfile.js`はGulp 4系の記述を採用しています。

| ファイル名 | 説明 |
| - | - |
| index.js | yarn scriptsで実行される親タスクが記載されています。必要な処理を統括して実行します。 |
| config.js | ディレクトリ設定など、頻繁に変更される可能性が高い値をオブジェクトとして管理しています。**軽微な設定変更であればここを変更すれば対応できる可能性が高いので、カスタマイズ時は最初に参照することを推奨します。** |
| pug.js | pugのコンパイルに関するタスクです。コンパイル設定の調整ができます。 |
| scss.js | scssのコンパイルに関するタスクです。コンパイル設定の調整ができます。デフォルトでautoprefixerが動作するようになっています。 |
| images.js | 画像圧縮に関するタスクです。圧縮設定の調整ができます。 |
| copyJs.js | configで`useWebpack`を無効にしているとき、`_dev`配下のJSファイルを何もせずに`dist`にコピーする処理を行います。(README の 「ES5利用時」に実行されるタスクです) |
| webpackDev.js | configで`useWebpack`を有効にしているとき、`webpack.dev.js`の設定を用いてwebpackのコンパイルタスクを実行します。(`yarn dev`時に実行されます)
| webpackBuild.js | configで`useWebpack`を有効にしているとき、`webpack.prod.js`の設定を用いてwebpackのコンパイルタスクを実行します。(`yarn build`時に実行されます) |
| formatDestHtml.js | `yarn build`の実行時に、`dist`配下にある成果物HTMLに対してprettierをかける処理を行います。 |
| server.js | BrowserSync (ローカルサーバー)を立ち上げます。 |
| watch.js | `_dev`配下のファイルの変更を監視し、コンパイルタスクを再実行します。pug および SCSSの変更時にはBrowserSyncのホットリロードがかかります。 |
