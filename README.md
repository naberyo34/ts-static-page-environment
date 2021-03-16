# 普通の web ページを TS でサクッと作るミニマル環境

## 方針

- CSS とか画像を分割管理できないと色々困るので、webpack は TS のコンパイルとバンドルに徹する
- 原則タスクは gulp で行い、webpack も webpack-stream 経由で動かす
- gulpfile.js/config の useTs を false にするとJSそのままコピーモードに変わります
- TSのコンパイルだけはwebpack側でwatchしているため、ホットリロードがかからない
