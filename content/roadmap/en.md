# Roadmap

## Release coming soon 

In ordered to improve the convenience of Zwin, we are planning to release the following features soon.

#### XWayland support

XWayland runs on top of Wayland compositors and forward the windows from X11 applications to the compositors in a Wayland-compatible way. XWayland support will be released on Zen soon, and it enables the users to run X11 applications not compatible with Wayland such as Visual Studio Code on Zen.

#### Popup / Subsurface
Some wayland applications create another window on the main window. Right-click menu of Google Chrome is a good example. These are called Popup / Subsurface in Wayland, and Zen will support these features soon.

#### Close button on 3D windows
In the current implementation of Zen, unlike 2D windows, 3D windows cannot be closed with GUI close buttons. We are planning to release this feature soon to make the interaction with 3D apps much easier.

#### Copy & Paste / Drag & Drop in 2D windows
Some well-known features of 2D operations on 2D windows such as Copy & Paste / Drag & Drop are not supported by Zen. We plan to support them soon to let users use 2D apps in Zwin as in the existing 2D windowing systems.

## Second release
With the goal of replacing everyday desktop environment, we are planning to release the following contents as the second large release. As of the first release (Jan 16, 2023), the target date of the second release is Jan 16, 2024.

### Core concepts


#### Space
[Space](/en/what_is_it/interactions_on_zen#space-(under-development)) is a concept for swapping multiple environments easily.

Space will be implemented and included in the second release.

#### Arragement of apps on the world coordinate
In the current implementation, the positions of the windows in the VR world are limited to the surface of Seat Capsule, which is the combintaion of a cylinder & spheres surrouding the user.  
In the second release, we are planning to remove this restriction to put the applications anywhere in the world coordinate.

#### Ray lock
When you move Ray with mose/trackpad in current Zen, it moves parallely keeping its angle.

We are planning to add a new mode, in which the user end of Ray is fixed to a point and mouse/trackpad moves the other end of Ray. Zwin protocol will allow the apps to chose one of these modes when interacting with Ray. That makes it easier to do some operations such as rotation on the 3D apps.

#### Change in the number of boards
In Zen, now users can only change the number of boards with the configuration file and it cannot be increased/decreased at runtime.

After the second release, the users will be able to change the number of boards intereactively at runtime. It enables the users to customize their VR desktop environment more freely.

### Support
The following features/devices currently not supported in Zwin/Zen are planned to be included in the second release.

- Copy & Paste in 3D windows
- Drag & Drop in 3D windows
- Wireless connection to Quest
- Wired OpenVR / OpenXR devices (e.g. Valve Index)
- Webcam/audio
- Screen sharing
- Wine (Windows apps)

### Usability: 2D
The following features will be implemented in Zen to improve the usability of 2D windowing system.

- Status bar/Background apps icon
- Launcher/Task bar
- Task switcher with Alt+Tab
- Board/Window/Space list screen
- Minimize windows/boards
- Settings app
- Custom lock screen
- Server Side Decoration
- Sleep

### Usability: 3D
The following features will be implemented in Zen to improve the usability of 3D windowing system.

- Quick task switcher with head movements
- Detect version mismatch of Zen Mirror on desktop & VR headset
- Stage (focus on the 3D windows)
- Hide desk
- Curved Boards
- View share with virtual camera
- Virtual keyboard synced with the real one

### Apps
The following apps will be released as the offcial application on Zwin.

- Zen Object Viewer: gltf support
- Zen Object Viewer: UI and lightweight editing of 3D model (e.g. rotate and save)
- New App: an app for displaying 360 images/videos
- New App: a chilling ambient app (such as a candle, pet etc.)

### Configuration
The following attributes will be added to the user configuration file.

- Board position
- Board size
- Number of Spaces

### Installation/Developer support
To make it easy to install Zen and develop Zwin apps, we are planning to support the followings by the second release.

- Download of Zen Mirror app from Oculus App Lab
- Easy installation from apt
- Developer API for Easy 2D UI elements (texts, icons... etc) display in 3D windows
- Developer API for displaying HUD (like task switcher) in front of users in VR

## Ambitions for the future
To expand the Zwin ecosystem more, we are also trying to support the following items in the future.

- Easy app development in Unity/Godot/Unreal 
- 6 degrees of freedom controller
- Hand tracking
- Multi user collaboration
- AR support 
- Integrated windoding system of smartphone + tablet + HMD + desktop


For further feature requests, please contact as via Discord.  
[http://discord.gg/PPJEFrdE9f](http://discord.gg/PPJEFrdE9f)