#!/bin/bash

echo "ボイラープレート環境構築ウィザードにようこそ"

# JS言語選択
echo "JS開発で利用したい言語を選んでください"
select JS_LANG in "TypeScript" "ESNext" "ES5";
do
  case $JS_LANG in
  "TypeScript")
    echo "TypeScriptを利用します"
    break;;
  "ESNext")
    echo "ESNext(ES6以降のJS)を利用します"
    echo "dev/js 配下のサンプルファイルをJSに変更します"
    mv ./_dev/js/index.ts ./_dev/js/index.js
    echo "ESNext向けESLintの設定をコピーします"
    cp ./setup/.eslintrc-es6 .eslintrc
    echo "webpack.dev.js / prod.jsをJS向けに修正します"
    sed -i "" -e "s!index.ts!index.js!" webpack.dev.js webpack.prod.js
    echo "tsconfig.jsonを削除します"
    rm tsconfig.json
    break;;
  "ES5")
    echo "ES5を利用します"
    echo "dev/js 配下のサンプルファイルをJSに変更します"
    mv ./_dev/js/index.ts ./_dev/js/index.js
    echo "ES5向けESLintの設定をコピーします"
    cp ./setup/.eslintrc-es5 .eslintrc
    echo "gulpをwebpackを利用しない設定に修正します"
    sed -i "" -e "s!useWebpack: true!useWebpack: false!" ./gulpfile.js/config.js
    echo "webpack.dev.js / prod.jsを削除します"
    rm webpack.dev.js
    rm webpack.prod.js
    echo "tsconfig.jsonを削除します"
    rm tsconfig.json
    break;;
  esac
done

echo "setup フォルダを削除します"
rm -rf ./setup
echo "設定が完了しました!ファイル差分をコミットしてから利用を開始しましょう"
echo "設定を誤った場合はすべての差分を破棄してからウィザードを再実行してください"

exit 0
