# Update

We develop Zen day by day, and release new versions in a short span.
Here, we describe how to update Zen to the latest version, or how to get Zen of a specific version.

In the following, we will use [zen-release-manager](https://github.com/zwin-project/zen-release-manager), which we used for the [installation](/en/getting_started/installation).

**If you are installing Zen for the first time, please follow the [Installation](/en/getting_started/installation) page.**


## Uninstall Zen

We recommend uninstalling Zen that is already installed on your system.

[Uninstallation](/en/getting_started/uninstallation)

## Install packages

Since required packages may have been updated, please install the packages again by following the [Install packages](/en/getting_started/installation#install-packages) section of the installation page.

## Update zen-release-manager

```shell
$ cd /path/to/zen-release-manager
$ git pull
```

## Cleanup build directory

To reduce build time, some build targets are not removed.

```shell
$ ./zen-release clean
```

## Configure the version of Zen

Configure the version of Zen you want to use using [zen-release-manager](https://github.com/zwin-project/zen-release-manager).

When configuring the latest release.
```shell
$ ./zen-release configure ./release/latest.yaml
```

You can also select the specific release.
```shell
$ ./zen-release configure ./release/<release>.yaml
```

## Reinstall Zen Mirror

The APK file of Zen Mirror may have been updated. Please reinstall Zen Mirror by following the [Install Zen Mirror](/en/getting_started/installation#install-zen-mirror) section.

If you are unable to reinstall Zen Mirror, please uninstall it and try again.

## Build and install Zen

Build and install Zen again by following the instruction in the [Build and install zen](/en/getting_started/installation#build-and-install-zen) section.

**Enjoy the new features!**
