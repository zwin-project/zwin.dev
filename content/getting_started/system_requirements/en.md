# System requirements
The following environments have been confirmed for running Zen (→[What is Zwin?](/what_is_it/what_is_zwin)).

## PC
### OS
Supported operating systems are:
- Ubuntu22.04 LTS
- Arch Linux

### Graphics
Unlike typical PCVR, a high-powered GPU is not required on the PC.
This is because the headset handles rendering in Zwin (→[Rendering Scheme](/what_is_it/rendering_scheme))

The PC's GPU must support OpenGL ES 3.2. The following laptop PCs have been confirmed for operation:

- Lenovo ThinkPad X13 Gen2
 - CPU: 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80 GHz
 - GPU: TigerLake-LP GT2 [Iris Xe Graphics]

## Wired Connection
現状のZwinでは、ウィンドウのテクスチャを高速で送る必要があるためPCとヘッドセットを高速なUSBケーブルで接続する必要があります。
ワイヤレスにも対応中ですが、まだ問題が多いため有線が推奨です。（→[ロードマップ](/roadmap)）
Currently, Zwin requires a fast USB cable to reliably send the texture of windows between the PC and headset. Although wireless support is in development, wired connection is currently recommended due to several issues (→[Roadmap](/roadmap)).

- PC側のポートはUSB3.0より速いものが推奨です。
- 高品質で充電可能なケーブルが必要です。
  - [Metaの純正のケーブル](https://www.meta.com/ja-jp/help/quest/articles/headsets-and-accessories/oculus-link/)が最もおすすめです。
  - 品質の悪いケーブルでも使用は可能ですが、ウィンドウを複数開くとRayの動きが遅くなるなどの問題が発生します。
- A port faster than USB3.0 is recommended on the PC side.
- A high-quality cable with enough power supply is required.
  - [Meta's certified cable](https://www.meta.com/ja-jp/help/quest/articles/headsets-and-accessories/oculus-link/) is the most recommended.
  - Although it is possible to use a low-quality cable, problems such as slow movement of Ray when opening multiple windows may occur.


## VR Headsets
Compatible with the following headsets:
- Meta Quest 2
- Meta Quest Pro
Although Quest 1 can also be used, it is not recommended due to rendering performance issues.
