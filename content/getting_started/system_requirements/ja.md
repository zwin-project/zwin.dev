# システム要件
以下の環境でZenの動作を確認しています（→[Zwinとは？](/what_is_it/what_is_zwin)）。

## PC
### OS
以下のOSに対応しています。
- Ubuntu22.04 LTS
- Arch Linux

### グラフィックス
一般的なPCVRと異なり、PC側に特にハイパワーなGPUは必要ありません。
これはZwinではヘッドセット側がレンダリングを担当するためです。（→[レンダリング方式](/what_is_it/rendering_scheme)）

PCのGPUはOpenGL ES 3.2をサポートする必要があります。
以下のラップトップPCで動作を確認済みです。

- Lenovo ThinkPad X13 Gen2
 - CPU: 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80 GHz
 - GPU: TigerLake-LP GT2 [Iris Xe Graphics]

## 有線接続
現状のZwinでは、ウィンドウのテクスチャを高速で送る必要があるためPCとヘッドセットを高速なUSBケーブルで接続する必要があります。
ワイヤレスにも対応中ですが、まだ問題が多いため有線が推奨です。（→[ロードマップ](/roadmap)）

- PC側のポートはUSB3.0より速いものが推奨です。
- 高品質で充電可能なケーブルが必要です。
  - [Metaの純正のケーブル](https://www.meta.com/ja-jp/help/quest/articles/headsets-and-accessories/oculus-link/)が最もおすすめです。
  - 品質の悪いケーブルでも使用は可能ですが、ウィンドウを複数開くとRayの動きが遅くなるなどの問題が発生します。

## VRヘッドセット
以下のヘッドセットに対応しています。
- Meta Quest 2
- Meta Quest Pro
Quest 1でも使うことは可能ですが、レンダリング性能の問題から非推奨となっています。
