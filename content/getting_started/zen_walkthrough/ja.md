# Zen ウォークスルー
このページでは、[Walkthrough of Zwin](https://www.youtube.com/watch?v=uZEDEfEZB1w&t=2s)の内容に沿ってZenの使い方を解説していきます。

## システム要件
Zenを使うには、UbuntuかArch LinuxのパソコンとMeta Quest 2かPro、それを接続するケーブルが必要です。パソコンは普通のラップトップで構いません。

![system requirement](system_requirement.png "imahge_tooltip")

## 2DスクリーンでZenを使う
Arch Linux をお使いの場合、事前に以下のコマンドを実行して下さい。

```shell
$ echo "/usr/local/lib64" | sudo tee /etc/ld.so.conf.d/local-lib64.conf
```

まずはUbunutu上の既存のウィンドウシステムのセッションを以下のコマンドで終了してください。
```
sudo systemctl restart gdm
```

Ubuntuでは、その後にログイン画面が表示され、そこから利用するウィンドウシステムを選ぶことができます。"ZEN"をクリックしてからログインすると2DのZenが起動します。
![choose_zen1](choose_zen1.png "image_tooltip")
![choose_zen2](choose_zen2.png "image_tooltip")


2Dでは、Chrome、ターミナルなどの普通のLinux用Waylandアプリがそのまま使えます。
![2d_apps](2d_apps.png "image_tooltip")
*注意* ：Ubunutuのデフォルトファイルマネージャ（Nautilus）は、現在の環境では開くのに非常に長い時間がかかります（~5分程度）。気長にお待ち下さい。

## VR への切り替え
画面の右下にある"VR"ボタンをクリックすると、接続できるヘッドセットの一覧が表示されます。
![no_headset](no_headset.png "image_tooltip")

VRでZenを使うには、以下の手順にしたがってPCに接続されたQuest上でZen Mirrorを開いてください。

- ケーブルを使ってQuestとPCを接続してください。
  - "接続したデバイスにファイルへのアクセスを許可しますか？"のダイアログがQuest内で表示されるので忘れずに許可してください。
- ZenにQuestを認識させるために、以下のコマンドをターミナルから実行します。

```
adb forward tcp:50051 tcp:50051
```

- Questのアプリ一覧を開き、右上のドロップダウンから"提供元不明"を選択します。
- 中にあるZen Mirrorを起動します。
![choose_zen_mirror](choose_zen_mirror.png "image_tooltip")

これらの手順を完了することでZenがこのヘッドセットを認識し、"Wired"ヘッドセットが一覧に追加されます。

![headset_found](headset_found.png "image_tooltip")

右側の"Connect"ボタンをクリックすることで、ヘッドセットを使ってVRモードでZenを使い始めることができます。このとき、IPアドレスと共にヘッドセットも同時に表示される場合がありますが、こちらは無線での接続を表しています。Beta版のZwinでは無線よりも**有線が推奨されています**。

## VRでの操作
VRでは、2Dで使っていた画面がそのまま表示されます。
![3d_world](3d_world.png "image_tooltip")

VRでの操作は[Ray](https://www.zwin.dev/ja/what_is_it/interactions_on_zen#ray)を通じて行います。Rayはカーソルの役割を果たします。マウスを動かすと、Rayはその動きに追随して動きます。
![ray](ray.png "image_tooltip")

設定ファイルを使って、アプリケーションのランチャーを画面下のDockに追加することができます。 下側のDockにあるランチャーアイコンをクリックすることで、[Board](https://www.zwin.dev/ja/what_is_it/interactions_on_zen#board)内でウィンドウを開くことができます。ウィンドウをドラッグ&ドロップすることで、ウィンドウを他のBoardに移すことができます。また、Board自体も同様にして動かせます。

## 3Dウィンドウ
インストールスクリプトによって生成されたデフォルトの設定ファイルを利用している場合、nautilus ファイルエクスプローラーのランチャーアイコンがDockに表示されています。
[STLファイルをZen Object Viewerで開く](/ja/getting_started/configuration#stlファイルをzen-object-viewerで開く)設定をすれば、 ファイルエクスプローラーをアイコンから開き、STLファイルをダブルクリックすると、そのファイルを私達の作った3Dアプリケーションである"Zen Object Viewer"で開くことができます。

![3d_app](3d_app.png "image_tooltip")

（一部開けないSTLファイルがあります。動作確認済みのSTLファイルのサンプルは[Zen Object Viewerのassets](https://github.com/zwin-project/zen-object-viewer/tree/main/assets)をご覧ください。）

このアプリケーションは3DモデルをVR空間内に表示します。Rayをモデルに合わせてスクロールすると、モデルを回転させることができます。モデルは3Dウィンドウとして動作するので、ドラッグ&ドロップで位置を動かすこともできます。

## 2Dスクリーンへの再切り替え
もしVRに疲れた場合は、ヘッドセットを外して2Dモードに戻ってくることができます。`Meta + V`のキーボードショートカットを使ってVRモードを終了できます。

VRで使っていたBoardには、画面下のスイッチャーを通して引き続きアクセスすることができます。各Board上のウィンドウは、VRモードを終了した後も保存されます。
