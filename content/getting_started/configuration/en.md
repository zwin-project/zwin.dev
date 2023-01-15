# Configuration



```:config.toml
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

[[favorite_apps]]
name="Zen Object Viewer"
exec="zen-object-viewer"
icon="/usr/local/share/zen-object-viewer/assets/icon/3d_viewer_icon.gltf"
disable_2d=true
```
