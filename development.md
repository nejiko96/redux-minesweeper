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
   ※PATH環境変数に「C:\Users\\<user>\AppData\Local\Yarn\bin」を追加

1. create-react-app インストール
   ```
   yarn global add create-react-app
   ```

## プロジェクト作成

1. ソース生成
   ```
   cd redux-minesweeper
   create-react-app redux-minesweeper
   ```

1. 追加パッケージインストール
   ```
   yarn add react-redux redux
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
