## git

- 今回はコミットの期限があるのでブランチを切らずに実装しましょう。
- コミットメッセージは"add: 〇〇機能の実装", "fix: 〇〇の修正"といったようにわかりやすいメッセージにしましょう

- 発表に必須な要素は完成したのでproductブランチを切る。発表直前までいじらない。

## frame

- frame.htmlのrectオブジェクトの部分と同じサイズに収まるようにしましょう。

### 代表選手の市場価値について

- 2014年のナイジェリア代表選手Odunlami Kunle...ページに当時の市場価格が書かれているが、形式が異なっていたため、手打ちとする。

- オリンピックの開催年の市場価値のデータが存在しない場合、前後の市場価値のデータから線形近似によって市場価値を算出した

- そもそも市場価値が存在しない選手が合計11人いたが、これらは市場価値を0として、データ可視化の際に注意書きとしてデータが存在しない旨示すこととする

### データ引用元

- 首都の緯度経度：[世界の首都の位置データ Location Data of World Capitals](https://amano-tec.com/data/world.html)

- 選手の市場価値：[Transfermarkt: サッカーの移籍、噂、市場価値とニュース](https://www.transfermarkt.jp/)

- 試合当日のtwitterでの反応：[Twitter](https://twitter.com)

- W杯の順位：[wikipedia](https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8)

### コードの引用元

- hands-on5の対象としたforce simulation：[データビジュアライゼーション・ラボ](https://wizardace.com/d3-forcesimulation-link-detail/)

- Twitterからデータを取得:[Optimized-Modified-GetOldTweets3-OMGOT](https://github.com/marquisvictor/Optimized-Modified-GetOldTweets3-OMGOT)

- jsにおけるsleep関数：
[【JavaScript入門】処理を一時停止するsleep機能の実現方法まとめ](https://www.sejuku.net/blog/24629)

- Mecabを用いた分かち書き：
[Python で自然言語処理をしてみよう - MeCab 編](https://rinsaka.com/python/nltk/05-wordcloud.html)
