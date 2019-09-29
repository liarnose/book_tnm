# book_tnm
このリポジトリはvivliostyleでA4版データを生成するためのスターターキットです。

ワークフローとしてはmarkdown+handlbarsテンプレートを採用し、
デザイン面はファーイーストアミューズメントリサーチ社のTRPG、トーキョーナイトメアの書籍を参考にしています。

## install
```npm init```

## launch viewer
```npm run build:theme```
```npm run build:text```
then
```npm start```

ファイルの処理順がいい加減なのでうまくビルドできない時は何回かrun buildしてください。
あとcard.htmlをcliでpdf化すると何故か文字が全部すっ飛ぶのでブラウザの印刷ダイアログを使ってください。

## LICENSE
MIT