React + Redux アプリ開発
======================

## 環境構築

1. Node.jsのインストール  
   https://nodejs.org/ja/
   ```
   node --version
   npm install -g npm
   npm --version
   ```

1. Yarnのインストール
   ```
   npm install -g yarn
   yarn --version
   ```
## プロジェクト作成

1. ソース生成
   ```
   yarn create react-app redux-minesweeper
   cd redux-minesweeper
   ```

1. redux 追加パッケージインストール
   ```
   yarn add react-redux redux @reduxjs/toolkit

   ```

1. Gitリポジトリ初期化
   ```
   git init
   git add .
   git commit -m "initial import"
   ```

## 開発

1. アプリ起動
   ```
   yarn start
   ```
   ブラウザが自動的に立ち上がり、  
   http://localhost:3000/  
   が表示される

1. 起動した状態のままソースを追加・変更すると自動でブラウザに反映される

1. 停止  
   Ctrl+C

1. ビルド
   ```
   yarn build
   ```
   ```build```フォルダにビルド結果のindex.htmlなどが生成される

1. Github Pages にデプロイ
   ```
   yarn deploy
   ```
## VSCodeの設定

### eslint(JavaScriptコードチェッカー)
※コードが最新のJavaScriptやReactのお作法に沿って書かれているかチェックしてくれる

1. packages.json の依存関係に eslint が含まれているので  
   eslint 自体は使えるようになっている
   ```
   > yarn run eslint --version
   v8.20.0
   ```

1. .eslintrc.jsonを生成
   ```
   > yarn run eslint --init
   ✔ How would you like to use ESLint? · style
   ✔ What type of modules does your project use? · esm
   ✔ Which framework does your project use? · react
   ✔ Does your project use TypeScript? · No / Yes
   ✔ Where does your code run? · browser, node
   ✔ How would you like to define a style for your project? · guide
   ✔ Which style guide do you want to follow? · airbnb
   ✔ What format do you want your config file to be in? · JSON
   ```

1. ビルド時にコードチェックが行われるようになる
   ```
   > yarn build
   ...

   [eslint] 
   src/app/App.js
   Line 26:13:  Function component is not a function declaration  react/function-component-definition

   ...
   ```

1. VSCodeの拡張機能で「ESLint」をインストール

1. エディタで開いているソースのコードチェックエラーが「問題」タブに出てくるようになる
