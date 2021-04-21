ts-static-page-environment

# 概要

TypeScript / JavaScript (ESNext) / JavaScript (ES5) を選択できる静的ページ制作環境です。
本 README には基本的な利用方法を記載しています。詳細についてはこちらのドキュメントをご覧ください。

# 機能

- gulp で pug / SCSS をコンパイルし、効率的なマークアップが行えます。
- webpack を用いて ESNext / TypeScript コードのバンドルが可能です。
- webpack を介さない JS ファイルのコピーが可能（成果物をビルドしたくない場合）です。

# ディレクトリ解説

| 名前 | 説明 |
| - | - |
| _dev | 開発用のフォルダ。pug, scss, js, 画像ファイルが格納されます。 |
| dist | 成果物のフォルダ。gitの管理対象には含まれません。`yarn dev`や`yarn build`で生成されます。 |
| gulpfile.js | gulpの設定ファイル |

# Getting Started

## 1. 利用言語を決める

TypeScript / JavaScript (ESNext) / JavaScript (ES5) から、開発に使いたい言語を選択しましょう。

- [TypeScriptを使う場合](#TypeScriptを使う場合)
- [JavaScript(ESNext)を使う場合](#JavaScript(ESNext)を使う場合)
- [JavaScript(ES5)を使う場合](#JavaScript(ES5)を使う場合)

### TypeScriptを使う場合

`_dev/js/`配下で記述した TypeScript コードを `dist/assets/js/main.js` (デフォルト)にコンパイルします。webpack(ts-loader) によるビルドが行われるため`dist`配下に書き出された js の直接編集はできません。

本ボイラープレートはデフォルトで TypeScript を利用するよう設定しているため、**追加の作業は不要**です。

### JavaScript(ESNext)を使う場合

`_dev/js/`配下で記述した JavaScript コードを `dist/assets/js/main.js` (デフォルト)にコンパイルします。webpack(babel-loader) によるビルドが行われるため`dist`配下に書き出された js の直接編集はできません。

#### 必要作業

- `webpack.dev.js` および `webpack.dev.prod.js`の設定を変更する

```javascript
entry: './_dev/js/index.ts',
```

を

```javascript
entry: './_dev/js/index.js',
```

に変更します。

- `.eslintrc` を ESNext 用にする

ルートディレクトリの`.eslintrc`は TypeScript 用のため、削除します。同階層にある`.eslintrc-es6`を`.eslintrc`にリネームしましょう。

- `tsconfig.json`を削除する

`tsconfig.json`は TypeScript 用の設定ファイルのため、削除します。

### JavaScript(ES5)を使う場合

`_dev/js/`配下で記述した JavaScript コードを**コンパイルせずに**そのまま`dist/assets/js/main.js` (デフォルト)にコピーします。あえてレガシーな環境を利用したい場合や、jQuery を採用する場合に便利です。

webpack でのビルドを行わないため、`dist`配下のコードは開発時のものと全く同じ状態になります。

#### 必要作業

- `gulpfile.js` の設定を変更する

`gulpfile.js/config.js`の設定

```javascript
useWebpack: true,
```

を

```javascript
useWebpack: false,
```

に変更します。

- `webpack.dev.js` および `webpack.dev.prod.js`の設定を変更する

```javascript
entry: './_dev/js/index.ts',
```

を

```javascript
entry: './_dev/js/index.js',
```

に変更します。

- `.eslintrc` を ES5 用にする

ルートディレクトリの`.eslintrc`は TypeScript 用のため、削除します。同階層にある`.eslintrc-es5`を`.eslintrc`にリネームしましょう。

- `tsconfig.json`を削除する

`tsconfig.json`は TypeScript 用の設定ファイルのため、削除します。

## 2. 開発コマンドを利用する

- 初回起動前にはパッケージインストールが必要です。

```
yarn
```

### yarn scripts 一覧

| コマンド | 内容 |
| - | - |
| dev   | gulp でプレビューサーバーと watch タスクを開始します。 |
| build | ビルド用の設定で`dist`配下のファイルを作成します。**webpack 等の設定が`dev`とは異なる**ため、納品時は必ずこちらのコマンドを利用してください。 |
| eslint | ESLintを実行します。 (指摘のみ) |
| eslint:fix | ESLintを実行します。 (fixできるものは修正します) |
| stylelint | stylelintを実行します。 (指摘のみ) |
| stylelint:fix | stylelintを実行します。(fixできるものは修正します) |
| format | prettierでフォーマットをかけます。 |
| test | jest のテストスイートを実行します。 |

### husky (lint-staged) について

コミットの前に、ステージングしたファイルを対象に
- eslint
- stylelint
- prettier

を実行します。エラーが発生した場合、コミットを中断します。

## 3. 開発を開始する

`_dev`配下を編集して、ページを作成します。

### pug

- ディレクトリ、ファイル構成はサンプルのため、各自利用しやすいよう調整してください。
- ファイル名に`_`がついているファイルはビルド対象から外されます。includeして利用するファイルには`_`をつけてください。
- 吐き出されるHTMLは圧縮されていますが、`yarn build`時にprettier側でフォーマットをかけることで圧縮を解除するようにしているため、特にpugコンパイル側での設定は不要です。

### SCSS

- ディレクトリ、ファイル構成はサンプルのため、各自利用しやすいよう調整してください。
- ファイル名に`_`がついているファイルはビルド対象から外されます。importして利用するファイルには`_`をつけてください。
- 吐き出されるCSSは圧縮しません。圧縮したい場合は`gulpfile.js/scss.js`で設定を変更してください。

### JS

- 先述の設定どおりビルドやコピーが行われます。

### images

- 画像ファイルは、gulpのタスクにより圧縮とコピーが行われます。
- 圧縮設定は`gulpfile.js/images.js`から変更できます。
