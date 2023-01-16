# Installation

## Goal

In this page, we have two objectives,

- Install **Zen Mirror** to Meta Quest 2 / Pro
- Install our desktop environment, **Zen** to Ubuntu 22.04

<!-- TODO: Link to the description of Zen and Zen Mirror -->

## Install packages

```shell
$ sudo apt-get update
```

It might be a good idea to install applications that work in Zen.

```shell
# Optional
$ sudo apt-get install weston google-chrome-stable
```

## Prepare build scripts

```shell
$ git clone https://github.com/zwin-project/zen-release-manager.git
$ cd zen-release-manager
$ ./zen-release configure ./release/latest.yaml
```

From this point forward, we will work in the `zen-release-manager` directory.

## Enable developer mode on Meta Quest

[Meta Quest Developer Center](https://developer.oculus.com/documentation/native/android/mobile-device-setup/ "Device Setup")

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

Did you find Zen Mirror in "Unknown Source" apps? Well done!

## Build Zen

Build and install protocol.

```shell
$ ./zen-release build protocol
$ sudo ./zen-release install protocol
```

Build and install dependent libraries.

This may take more than 10 minutes.

```shell
$ ./zen-release build deps
$ sudo ./zen-release install deps
```

Build and install Zen.

```shell
$ ./zen-release build desktop
$ sudo ./zen-release install desktop
```

## Generate default config.toml

A recommended configuration file will be generated in the appropriate location.

```shell
$ ./zen-release generate-config
```

