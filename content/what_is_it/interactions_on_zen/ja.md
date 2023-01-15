# Zenでのインタラクション

ZenはZwinのリファレンスコンポジッターです([Zwin Systemとは？](/what_is_it/what_is_zwin)を参照)。
長時間のマウス・キーボードでのVR作業に向けてデザインされています。


## Ray

[https://www.youtube.com/watch?v=bhkqvm2oHdc](https://www.youtube.com/watch?v=bhkqvm2oHdc)

VRではRayを使って3Dオブジェクトを操作できます。VRの世界ではRayは一般的な手法ですが、よくあるRayと異なるのは、Zenではコントローラではなくマウス/トラックパッドを使ってRayを操作する点です。
例えばマウスを右に動かすと、Rayも右に動きます。上に動かすと上に動きます。2DウィンドウにRayを向けている際には、Rayは普通のカーソルと同じような挙動になります。


## Board

Boardは、これまでの2Dの世界と3Dの世界の間をつなぐ概念です。

VRでは、Boardはバーチャルモニターのように振る舞います。2Dウィンドウが張り付く面のようなものです。Boardは自由に動かしたり、増やしたり減らしたり、リサイズしたりできます。

![alt_text](image1.png "image_tooltip")


一方2Dスクリーンでは、すべてのBoardが1つの画面の中にまとめて表示され、どのBoardを表示するかをその都度選択することができます。Windows/Ubuntuにおける仮想デスクトップ、macOSにおけるSpaceのように使うことができます。


![alt_text](image2.png "image_tooltip")

（プロトタイプのデザイン；リリース版では見た目が異なる可能性があります）

Boardによって、VRでも2Dスクリーンでも、簡単に2Dウィンドウを管理できます。

またv0.1では実装されていませんが、Boardを最小化できるようにすることで、さらに容易にウィンドウを管理できるようにすることも検討しています。


## Space (準備中)

Spaceは複数のバーチャル環境を簡単に切り替えできるようにする概念です。1つのSpaceは、「ある環境/視界全体」に対応します。1つのSpaceの中では、1つのExpansive 3D Window、また多くのBounded 3D Windowを開くことができ、Spaceを切り替えることで周囲の風景・環境を完全に切り替えられます。

Spaceはv0.1では実装されていません。Spaceの仕様は今後変更される可能性があります。


![alt_text](image3.png "image_tooltip")
