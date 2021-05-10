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
    echo "ESNext向けESLintの設定をコピーします"
    cp ./setup/.eslintrc-es6 .eslintrc
    echo "webpack.dev.js / prod.jsをJS向けに修正します"
    sed -i "" -e "s!index.ts!index.js!" webpack.dev.js webpack.prod.js
    echo "tsconfig.jsonを削除します"
    rm tsconfig.json
    break;;
  "ES5")
    echo "ES5を利用します"
    echo "ES5向けESLintの設定をコピーします"
    cp ./setup/.eslintrc-es5 .eslintrc
    sed -i "" -e "s!index.ts!index.js!" webpack.dev.js webpack.prod.js
    echo "gulpをwebpackを利用しない設定に修正します"
    sed -i "" -e "s!useWebpack: true!useWebpack: false!" ./gulpfile.js/config.js
    echo "tsconfig.jsonを削除します"
    rm tsconfig.json
    break;;
  esac
done

rm -rf ./setup
echo "設定が完了しました!ファイル差分をコミットしてから利用を開始しましょう"

exit 0
