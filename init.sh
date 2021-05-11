#!/bin/bash

echo "🍙 ボイラープレート環境構築ウィザードにようこそ"
echo "ℹ️ 選択肢の数字を入力し、Enterで決定してください"

# JS言語選択
echo ""
echo "💻 JS開発で利用したい言語を選んでください"
select JS_LANG in "TypeScript" "ESNext" "ES5";
do
  echo ""
  case $JS_LANG in
    "TypeScript")
      echo "ℹ️ TypeScriptを利用します"
      echo "🛠 dev/js 配下にサンプルファイルをコピーします"
      cp -r ./setup/js-typescript ./_dev/js
      break;;
    "ESNext")
      echo "ℹ️ ESNext(ES6以降のJS)を利用します"
      echo "🛠 dev/js 配下にサンプルファイルをコピーします"
      cp -r ./setup/js-es6 ./_dev/js
      echo "🛠 ESNext向けESLintの設定をコピーします"
      cp ./setup/.eslintrc-es6 .eslintrc
      echo "🛠 webpack.dev.js / prod.jsをJS向けに修正します"
      sed -i "" -e "s!index.ts!index.js!" webpack.dev.js webpack.prod.js
      echo "🛠 tsconfig.jsonを削除します"
      rm tsconfig.json
      break;;
    "ES5")
      echo "ℹ️ ES5を利用します"
      echo "🛠 dev/js 配下にサンプルファイルをコピーします"
      cp -r ./setup/js-es5 ./_dev/js
      echo "🛠 ES5向けESLintの設定をコピーします"
      cp ./setup/.eslintrc-es5 .eslintrc
      echo "🛠 gulpをwebpackを利用しない設定に修正します"
      sed -i "" -e "s!useWebpack: true!useWebpack: false!" ./gulpfile.js/config.js
      echo "🛠 webpack.dev.js / prod.jsを削除します"
      rm webpack.dev.js
      rm webpack.prod.js
      echo "🛠 tsconfig.jsonを削除します"
      rm tsconfig.json
      break;;
  esac
done

# ボイラープレート選択
echo ""
echo "💻 利用したいテンプレートエンジンを選んでください"
select TEMPLATE_ENGINE in "pug" "EJS";
do
  echo ""
  case $TEMPLATE_ENGINE in
    "pug")
      echo "ℹ️ pugを利用します"
      echo "🛠 pug向けサンプルファイルをコピーします"
      cp -r ./setup/pug/ ./_dev/pug/
      break;;
    "EJS")
      echo "ℹ️ EJSを利用します"
      echo "🛠 EJS向けサンプルファイルをコピーします"
      cp -r ./setup/ejs/ ./_dev/ejs/
      echo "🛠 gulpをEJSを利用する設定に修正します"
      sed -i "" -e "s!useEjs: false!useEjs: true!" ./gulpfile.js/config.js
      break;;
  esac
done

echo ""
echo "🛠 setup フォルダを削除します"
rm -rf ./setup
echo ""
echo "🍙 設定が完了しました!ファイル差分をコミットしてから利用を開始しましょう"
echo "ℹ️ 設定を誤った場合はすべての差分を破棄してからウィザードを再実行してください"

exit 0
