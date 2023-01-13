# 3Dウィンドウ

Zwinの中核をなす3D Windowについて説明します。


## 2つの種類：Bounded / Expansive

3D Windowには大別してBounded 3D WindowとExpansive 3D Windowの2種類があります。

Bounded 3D Windowは、空間内で大きさを持つ3D Windowです。移動、回転、リサイズなどが可能です。
v0.1では、Bounded 3D Windowを持つZwin向けサンプルアプリとしてzen-object-viewerを用意しています。

![alt_text](image1.png "image_tooltip")

また実装上は異なりますが、ZenにおけるBoardもBounded 3D Windowのように振る舞います。

一方Expansive 3D Windowには大きさが存在せず、空間全体を占有します。v0.1では、サンプルアプリとしてZennist（Zenのデフォルト背景アプリ）を用意しています。Zennistは遠くの風景や床、天井などを描画する役割を持っています。Zennistを終了し、別のExpansive 3D Windowを描画するアプリを立ち上げれば、景色を変更することができるようになっています。

![alt_text](image2.png "image_tooltip")
