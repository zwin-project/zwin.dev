# Installation

## Goal

In this page, we have two objectives,

- Install **Zen Mirror** to Meta Quest 2 / Pro
- Install our desktop environment, **Zen** to Ubuntu 22.04 / Arch Linux

<!-- TODO: Link to the description of Zen and Zen Mirror -->

**CAUTION**
Zwin and Zen are all beta versions. Some of them may not work well in your environment.
We will improve the quality of these in future development and add new features according to the [Roadmap](/en/roadmap).

## Install packages

### Ubuntu 22.04

```shell
$ sudo apt-get update
$ sudo apt-get install adb clang cmake git libcairo2-dev \
      libcglm-dev libdrm-dev libegl-mesa0 libgbm-dev \
      libgles-dev libglm-dev libglu1-mesa-dev libjpeg-dev \
      librsvg2-dev libwayland-dev libwlroots-dev meson pkg-config \
      wayland-protocols
```

It might be a good idea to install applications that work in Zen. To complete [Zen walkthrough](/en/getting_started/zen_walkthrough), you need `weston` to start the terminal, so it is highly recommended to install it.

```shell
# Optional
$ sudo apt-get install weston
$ sudo apt-get install google-chrome-stable
# If apt-get does not work, you can also download Chrome from
# https://www.google.com/chrome/?platform=linux
```

### Arch Linux

You can use any AUR helper. In this page, we will show examples using `yay`.

```shell
$ yay -Syu
```

```shell
$ yay -S --needed \
  git sudo clang make cmake meson ninja python python-pip curl unzip pkgconf \
  wayland wayland-protocols wlroots0.15 glm glew librsvg ttf-ubuntu-font-family
```

It might be a good idea to install applications that work in Zen.

```shell
# Optional
$ yay -S --needed weston google-chrome nautilus
```

## Prepare build scripts

```shell
$ git clone https://github.com/zwin-project/zen-release-manager.git
$ cd zen-release-manager
$ ./zen-release configure ./release/latest.yaml
```

From this point forward, we will work in the `zen-release-manager` directory.

## Enable developer mode on Meta Quest

See [Meta Quest Developer Center](https://developer.oculus.com/documentation/native/android/mobile-device-setup/ "Device Setup").

- [Joining or Creating an Organization](https://developer.oculus.com/documentation/native/android/mobile-device-setup/#joining-or-creating-an-organization)
- [Verify Your Account](https://developer.oculus.com/documentation/native/android/mobile-device-setup/#verify-your-account)
- [Enable Developer Mode](https://developer.oculus.com/documentation/native/android/mobile-device-setup/#enable-developer-mode)

## Install Zen Mirror

Download APK file.

```shell
$ ./zen-release download zen-mirror
```

Check that ADB recognize your Meta Quest.

```shell
$ adb devices
List of devices attached
1WMHH815K10424 device # OK
```

If you see following output, you need to allow USB debugging on Meta Quest.

```shell
List of devices attached
1WMHH815K10424 unauthorized # NG
```

Install APK file to Meta Quest.

```shell
$ adb install ./build/zen-mirror/zen-mirror.apk
```

Did you find Zen Mirror in "Unknown Sources" apps? Well done!

## Build Zen

If you are using Arch Linux, please execute following command beforehand.

```shell
$ export PKG_CONFIG_PATH="/usr/lib/wlroots0.15/pkgconfig:/usr/local/lib/pkgconfig:/usr/local/lib64/pkgconfig:${PKG_CONFIG_PATH}"
```

Build and install protocol.

```shell
$ ./zen-release build protocol
```

```shell
$ sudo ./zen-release install protocol
```

Build and install dependent libraries.

This may take more than 10 minutes.

```shell
$ ./zen-release build deps
```

```shell
$ sudo ./zen-release install deps
```

Build and install Zen.

```shell
$ ./zen-release build desktop
```

```shell
$ sudo ./zen-release install desktop
```

## Generate default config.toml

A recommended configuration file will be generated in the appropriate location.
See [Configuration](/en/getting_started/configuration).
```shell
$ ./zen-release generate-config
```

