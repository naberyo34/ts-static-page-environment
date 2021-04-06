# 静的ページ作成環境 (TS / ES6 / ES5 選択可)

## モード切替方法

- gulpfile.js/config.js/ の useWebpack で JS を webpack でビルドするかそのままコピーするかを選べる
- TS / JS を切り替える場合は webpack.dev.js および webpack.prod.js の entry の拡張子を変更する (初期設定: TS)
- .eslintrc は使いたいもののファイル名を.eslintrc に変更する (初期設定: TS)

## 残課題

- eslint の設定を詰めきれていない
- webpack 側に watch させているため JS のみホットリロードが実装できない(仕方ない)
