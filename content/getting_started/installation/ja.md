# インストール

## ゴール

このページでは二つのゴールをめざします。

- Meta Quest 2 / Pro に **Zen Mirror** をインストールする。
- Ubuntu 22.04 に私たちのデスクトップ環境 **Zen** をインストールする。

<!-- TODO: Link to the description of Zen and Zen Mirror -->

## 注意
ZwinやZenは全てベータ版です。中にはうまく動かないものがあります。
今後の開発でこれらのクオリティを上げていき、[ロードマップ](/ja/roadmap)に従って新しい機能を追加していく予定です。

## パッケージのインストール

```shell
$ sudo apt-get update
$ sudo apt-get install adb clang cmake git libcairo2-dev \
      libcglm-dev libdrm-dev libegl-mesa0 libgbm-dev \
      libgles-dev libglm-dev libglu1-mesa-dev libjpeg-dev \
      librsvg2-dev libwayland-dev libwlroots-dev meson pkg-config \
      wayland-protocols
```

私たちのデスクトップ環境で動作するアプリケーションをインストールしておくのも良いかもしれません。

```shell
# Optional
$ sudo apt-get install weston google-chrome-stable
```

## ビルドスクリプトの準備

```shell
$ git clone https://github.com/zwin-project/zen-release-manager.git
$ cd zen-release-manager
$ ./zen-release configure ./release/latest.yaml
```

今後は `zen-release-manager` ディレクトリの中で作業します。

## Meta Quest の開発者モードを有効にする

詳しくは[Meta Quest Developer Center](https://developer.oculus.com/documentation/native/android/mobile-device-setup/ "デバイスの設定")をご覧ください。

- [組織の参加・作成](https://developer.oculus.com/documentation/native/android/mobile-device-setup/#joining-or-creating-an-organization)
- [アカウントの認証](https://developer.oculus.com/documentation/native/android/mobile-device-setup/#verify-your-account)
- [開発者モードの有効化](https://developer.oculus.com/documentation/native/android/mobile-device-setup/#enable-developer-mode)


## Zen Mirror をインストールする

APK ファイルのダウンロード

```shell
$ ./zen-release download zen-mirror
```

Meta Quest が認識されるかを確認します。

```shell
$ adb devices
List of devices attached
1WMHH815K10424 device # OK
```

以下のような出力の場合は Meta Quest 側でUSBデバッグを許可する必要があります。

```shell
List of devices attached
1WMHH815K10424 unauthorized # NG
```

APK ファイルのインストール

```shell
$ adb install ./build/zen-mirror/zen-mirror.apk
```

提供元不明のアプリケーション一覧に Zen Mirror が表示されていればおっけーです。

## Zen をビルドする

プロトコルのビルドとインストール

```shell
$ ./zen-release build protocol
$ sudo ./zen-release install protocol
```

依存ライブラリのビルドとインストール (10分以上かかるかもしれません)

```shell
$ ./zen-release build deps
$ sudo ./zen-release install deps
```

Zenのビルドとインストール

```shell
$ ./zen-release build desktop
$ sudo ./zen-release install desktop
```

## デフォルトの設定ファイルを作成する

適切な場所におすすめの設定ファイルを生成します。[設定](/ja/getting_started/configuration)で詳細をご覧ください。

```shell
$ ./zen-release generate-config
```
