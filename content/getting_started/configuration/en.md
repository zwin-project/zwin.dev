# Configuration

![launcher](launcher.png "image_tooltip")

## Zen Settings

In the Beta version of Zen, settings related to the desktop environment are described in a [TOML](https://toml.io/en/) format file. This configuration file is loaded when Zen starts up. The following items can be set in this file.
- Wallpaper
- Number of Board
- Apps to be launched by default
- The list of apps that will be arranged in the launcher

You can generate a configuration file using [zen-release-manager](https://github.com/zwin-project/zen-release-manager) used in [Installation](/en/installation).

```
$ ./zen-release generate-config
```

This command will generate, for example, the following configuration.
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
disable_3d=true # Do not display in 3D launcher. Default is false.

[[favorite_apps]]
name="Zen Object Viewer"
exec="zen-object-viewer"
icon="/usr/local/share/zen-object-viewer/assets/icon/3d_viewer_icon.gltf"
disable_2d=true # Do not display in 2D launcher. Default is false.
```

The launcher allows you to arrange the apps you want to use in any way you want, so please try it. In the settings, the name `favorite_apps` corresponds to one app to arrange in the launcher.
For example, if you add the following settings...
```
# ...
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
# ...
```

it will look something like this.

![launcher](launcher.png "image_tooltip")


The location of the configuration file referenced by Zen is as follows.
- `$XDG_CONFIG_HOME/.config/zen-desktop/config.toml`
- `~/.config/zen-desktop/config.toml`


Ideally, these settings should be dynamically modifiable via GUI, so we will support this in the near future. If you are interested in development and release, please follow [Twitter](https://twitter.com/zwin_project), [GitHub](https://github.com/zwin-project), [Discord](http://discord.gg/PPJEFrdE9f), check it out!

## Open STL file in Zen Object Viewer

You may have seen a demo of a file viewer double-clicking an STL file and opening it in [Zen Object Viewer](https://github.com/zwin-project/zen-object-viewer). This section describes how to set this up.

First, create a desktop entry for Zen Object Viewer.
```:/usr/share/applications/zen-object-viewer.desktop
[Desktop Entry]
Name=Zen Object Viewer
Exec=/usr/local/bin/zen-object-viewer %U
Terminal=true
Type=Application
MimeType=model/stl
```

Then specify Zen Object Viewer as the desktop entry to launch for the STL file type.

```:~/.config/mimeapps.list
# ..
#
[Default Applications]
model/stl=zen-object-viewer.desktop
#
# ..
```

Now you can reflect this setting by rebooting, etc.
