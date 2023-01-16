# インストール

## ゴール

このページでは二つのゴールをめざします。

- Meta Quest 2 / Pro に **Zen Mirror** をインストールする。
- Ubuntu 22.04 / Arch Linux に私たちのデスクトップ環境 **Zen** をインストールする。

<!-- TODO: Link to the description of Zen and Zen Mirror -->

**注意**
ZwinやZenは全てベータ版です。環境によってはうまく動かない可能性があります。
今後の開発でこれらのクオリティを上げていき、[ロードマップ](/ja/roadmap)に従って新しい機能を追加していく予定です。

## パッケージのインストール

### Ubuntu 22.04

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

### Arch Linux

任意のAURヘルパーを用いてください。このページでは、 `yay` による例を示します。

```shell
$ yay -Syu
```

```shell
$ yay -S --needed \
  git sudo clang make cmake meson ninja python python-pip curl unzip pkgconf \
  wayland wayland-protocols wlroots0.15 glm glew librsvg ttf-ubuntu-font-family
```

私たちのデスクトップ環境で動作するアプリケーションをインストールしておくのも良いかもしれません。

```shell
# Optional
$ yay -S --needed weston google-chrome nautilus
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

APK ファイルをダウンロードします。

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

APK ファイルをインストールします。

```shell
$ adb install ./build/zen-mirror/zen-mirror.apk
```

「提供元不明のアプリケーション」一覧に Zen Mirror が表示されていれば完了です。

## Zen をビルドする

Arch Linux をお使いの場合、事前に以下のコマンドを実行して下さい。

```shell
$ export PKG_CONFIG_PATH="/usr/lib/wlroots0.15/pkgconfig:/usr/local/lib/pkgconfig:/usr/local/lib64/pkgconfig:${PKG_CONFIG_PATH}"
```

プロトコルのビルドとインストールをします。

```shell
$ ./zen-release build protocol
```

```shell
$ sudo ./zen-release install protocol
```

依存ライブラリのビルドとインストールをします。このステップは10分以上かかるかもしれません。

```shell
$ ./zen-release build deps
```

```shell
$ sudo ./zen-release install deps
```

Zenのビルドとインストールをします。

```shell
$ ./zen-release build desktop
```

```shell
$ sudo ./zen-release install desktop
```

## デフォルトの設定ファイルを作成する

適切な場所におすすめの設定ファイルを生成します。[設定](/ja/getting_started/configuration)で詳細をご覧ください。

```shell
$ ./zen-release generate-config
```
