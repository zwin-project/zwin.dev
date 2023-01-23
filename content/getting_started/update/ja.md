# アップデート

私たちは日々開発をしており，短いサイクルでリリースをしています。
このページではZenを最新のリリースバージョンにアップデートする，または特定のリリースバージョンのZenをインストールする手順を説明します。

また，ここでも[インストール](/ja/getting_started/installation)時に用いた[zen-release-manager](https://github.com/zwin-project/zen-release-manager)を使ってアップデートを行います。

**初めてZenをインストールする場合は，[インストール](/ja/getting_started/installation)の手順に従ってください。**

## アンインストール

既にZenをインストールされている場合、アップデートを行う前にアンインストールを行うことを推奨します。

[アンインストール](/ja/getting_started/uninstallation)

## パッケージのインストール

必要なパッケージが更新されている可能性がありますので、インストールページの[パッケージのインストール](/ja/getting_started/installation#パッケージのインストール)に従って、パッケージをインストールしてください。

## ビルドディレクトリのクリーンアップ

ビルドディレクトリをクリーンアップします。
ビルド時間の短縮のため，ビルド負荷が大きく更新が少ないビルドターゲットは削除されません。

```shell
$ ./zen-release clean
```

## リリースバージョンの指定

[zen-release-manager](https://github.com/zwin-project/zen-release-manager)を用いてリリースバージョンを指定します。

最新のリリースバージョンを適用する場合。
```shell
$ ./zen-release configure ./release/latest.yaml
```

特定のリリースバージョンを適用することも可能です。
```shell
$ ./zen-release configure ./release/<release>.yaml
```

## Zen Mirror の再インストール

Zen MirrorのAPKファイルに更新がある可能性があります。[Zen Mirrorをインストールする](/ja/getting_started/installation#zen-mirror-をインストールする)に従って、Zen Mirrorをインストールし直してください。

インストールに失敗する場合は一度インストール済みのZen Mirrorをアンインストールして下さい。

## Zenの再ビルド・インストール

[Zenをビルド・インストールする](/ja/getting_started/installation#zen-をビルド・インストールする)に従ってZenのビルドとインストールを行ってください。

以上でアップデートは完了です。
