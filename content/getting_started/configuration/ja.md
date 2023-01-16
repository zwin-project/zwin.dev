# 設定

![launcher](launcher.png "image_tooltip")

## Zenの設定

Beta版のZenでは、デスクトップの環境に関する設定を[TOML](https://toml.io/ja/)形式のファイルで記述しています。この設定ファイルはZenが起動するときに読み込まれます。この設定ファイルでは以下のような項目を設定できます。
- 壁紙
- Boardの枚数
- デフォルトで起動するアプリ
- ランチャーに並べられるアプリのリスト

[インストール](installation)で用いられる[zen-release-manager](https://github.com/zwin-project/zen-release-manager)を使えば、設定ファイルを生成できます。
```
$ ./zen-release generate-config
```
このコマンドにより、例えば以下のような設定が生成されます。
```:~/.config/zen-desktop/config.toml
[wallpaper]
filepath = "/usr/local/share/backgrounds/zen/Zen_Wallpaper_Main_3840x2160.png"

[board]
initial_count = 3

[space]
default_app = "zennist"

[[favorite_apps]]
name = "Google Chrome"
exec = "google-chrome-stable --enable-features=UseOzonePlatform --ozone-platform=wayland --disable-gpu"
icon = "/usr/share/icons/hicolor/128x128/apps/google-chrome.png"

[[favorite_apps]]
name="Weston Terminal"
exec="weston-terminal"
icon="/usr/share/weston/terminal.png"
disable_3d=true # 3Dのランチャーでは表示しない。デフォルトはfalse。

[[favorite_apps]]
name="Zen Object Viewer"
exec="zen-object-viewer"
icon="/usr/local/share/zen-object-viewer/assets/icon/3d_viewer_icon.gltf"
disable_2d=true # 2Dのランチャーでは表示しない。デフォルトはfalse。
```

ランチャーは、自分が使いたいアプリを自由に並べることができるのでぜひ試してください。設定では`favorite_apps`という名前がランチャーに並べる1つのアプリに相当します。
例えば、以下の設定を追記すると、
```
# ..
#
[[favorite_apps]]
name = "Google Chrome"
exec = "google-chrome-stable --enable-features=UseOzonePlatform --ozone-platform=wayland --disable-gpu"
icon = "/usr/share/icons/hicolor/128x128/apps/google-chrome.png"

[[favorite_apps]]
name="Weston Terminal"
exec="weston-terminal"
icon="/usr/share/weston/terminal.png"
#
# ..
```

以下のような見た目になります。

![launcher](launcher.png "image_tooltip")


Zenが参照する設定ファイルの位置は以下です。
- `$XDG_CONFIG_HOME/.config/zen-desktop/config.toml`
- `~/.config/zen-desktop/config.toml`


これらの設定はGUIで動的に変更可能であることが理想ですので、近い将来サポートしていきます。開発やリリースに興味がある方は[Twitter](https://twitter.com/zwin_project)や[GitHub](https://github.com/zwin-project)、[Discord](http://discord.gg/PPJEFrdE9f)をチェックしてみてください！

## STLファイルをZen Object Viewerで開く

ファイルビュワーで、STLファイルをダブルクリックして、[Zen Object Viewer](https://github.com/zwin-project/zen-object-viewer)で開いているデモを見たことがある人がいるかもしれません。この項目ではその設定方法を記述します。

まずZen Object Viewerのデスクトップエントリーを作成します。
```:/usr/share/applications/zen-object-viewer.desktop
[Desktop Entry]
Name=Zen Object Viewer
Exec=/usr/local/bin/zen-object-viewer %U
Terminal=true
Type=Application
MimeType=model/stl
```

そしてSTLのファイルタイプに対して起動するデスクトップエントリとしてZen Object Viewerを指定します。

```:~/.config/mimeapps.list
# ..
#
[Default Applications]
model/stl=zen-object-viewer.desktop
#
# ..
```

これで再起動などによって、この設定を反映させることができます。
