# React + Redux アプリ開発

## 環境構築

1. Node.js のインストール  
   https://nodejs.org/ja/

   ```
   node --version
   npm install -g npm
   npm --version
   ```

1. Yarn のインストール
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

1. Git リポジトリも作っておく
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

   `build`フォルダにビルド結果の index.html などが生成される

1. Github Pages にデプロイ
   ```
   yarn deploy
   ```

## VSCode の設定

### eslint(JavaScript コードチェッカー)

※コードが最新の JavaScript や React のお作法に沿って書かれているかチェックしてくれる

1. `packages.json` の依存関係に `eslint` が含まれているので  
   eslint 自体は使えるようになっている

   ```
   > yarn eslint --version
   v8.20.0
   ```

1. `.eslintrc.json` を生成

   ```
   > yarn run eslint --init
   ✔ How would you like to use ESLint? · style
   ✔ What type of modules does your project use? · esm
   ✔ Which framework does your project use? · react
   ✔ Does your project use TypeScript? · No / Yes
   ✔ Where does your code run? · browser
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

1. VSCode の拡張機能で「ESLint」をインストール

1. エディタでソースを開くとコードチェックエラーが「問題」タブに出てくるようになる

1. `.vscode/settings.json` に以下の設定をするとソース保存時に自動で修正される

   ```
   {
      "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true,
      }
   }
   ```

1. `eslint-config-react-app` を追加
   ```
   yarn add --dev eslint-config-react-app
   ```
   - `.eslintrc.json` の設定追加
     ```
     "extends": [
         "react-app",
         "plugin:react/recommended",
         "airbnb"
     ],
     ```

### Prettier （コードフォーマッター） の導入

コードをいい感じに整形してくれる

1. パッケージ追加

   ```
   yarn add --dev prettier eslint-plugin-prettier
   ```

1. `.prettierrc.yml` を作成

   ```
   singleQuote: true
   semi: true
   ```

1. `.eslintrc.json` の設定追加

   ```
   "extends": [
     ...
     "prettier"
   ],
   ```

1. 一括フォーマットするコマンド

   ```
   yarn prettier --write --ignore-path .gitignore .
   ```

1. VSCode の拡張機能で「Prettier」をインストール

1. `.vscode/settings.json` の設定追加

   ```
   // ESLint拡張機能のフォーマットを無効化
   "eslint.format.enable": false,
   // 保存時にPrettierによる整形を行う
   "editor.formatOnSave": true,
   "[javascript]": {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
   },
   ```

## 実装例

- タイマーを `useEffect()` で実装  
  [Timer.jsx](src/features/game/Timer.jsx)
- 長押しを `useEffect()` で実装  
  [Cell.jsx](src/features/game/Cell.jsx)
