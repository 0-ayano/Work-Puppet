# Puppet
## 概要
このアプリは、電子実験装置を遠隔で行えるWebアプリとなっており、以下の機能を持っています。
- カメラ映像の表示
- 測定値の表示
- 実験装置の電源操作
- グラフのリアルタイム生成
- 実験装置への実験指示

## 開発背景
高等専門学校（以下、高専）では、技術者の育成のために実験・実習を多く取り入れた専門教育を行っています。しかし、カリキュラムの都合上、理論を学ぶ座学と実験・実習には時間的なずれが生じています。これにより、座学で学んだ内容を忘れたころに実験を実施するため、実験の意図や内容を理解できず、単なる作業として実験に取り組む学生が多く見られます。現状だと、実験・実習での体験が授業内容の理解に結びつかないといった問題があるため、石川高専では、座学の授業の中にin situ 実験と呼ばれる実験や実演を取り入れ、体験を伴いながら学習できるようにしています。in situ 実験は、授業内容の理解を深め、体験として知識を定着させるとともに、学習意欲の向上にもつながると期待されています。しかし、一部の科目では、実験装置である電気機器が大型・大重量で、授業の旅に教室に持ち運ぶことが困難な点と、実験を安全に行うために実験装置を固定している点から、in situ実験を行えていません。そこで、in situ実験を遠隔でも行えるシステム（以下、遠隔操作型in situ実験システム）を開発しました。

## 成果と効果
- 概要で挙げた機能を実装しました。
- 類似のアプリケーションとの比較を行った結果、他の実験装置にも適用可能な点が優れていると判断しました。

## 使用技術
このアプリには、バージョンによって使用技術が異なるため、1つずつ自紹介します。

Versino1
  - Python
    - Django
    - numpy
    - pySerial
    - opencv-python
  - HTML, CSS
  - JavaScript
    - jQuery
    - Chart.js

Version2
- Python
  - FastAPI
  - numpy
  - pySerial
  - opencv-pytho
- Vue3.JS
- highcharts

## 学び
- JS内の処理を一時停止にする手法や、openCVの高速化手法について学びました。
- highchartsの機能を盛り込み、画面が小さくても、グラフの閲覧を容易に行えるようにする手法について学びました。

## 今後の展望
- Version3の開発
  - Version2に「OpenPLCで制御を行う実験装置でも実験が行える機能」の追加を行います。
- 実際に利用してもらい、アンケートから改善点を分析し、アプリに反映させる。
