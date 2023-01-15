![earth_scroll](earth_scroll_app.gif "image_tooltip")

# 3D App Development

**TL;DR: On Zwin, you can modify, rebuild, and run 3D client apps that support the Zwin protocol in VR.**

This tutorial is intended for those who have completed the steps in [installation](/en/getting_started/installation).
You can do this tutorial in Zen!

## CAUTION
The Beta version of Zwin is still incomplete and has the following caveats related to this document.

- 2D apps other than the Wayland client will not work.
  - In particular, apps such as VSCode will not work.
  - Instead, **use a CUI editor such as Vim or nano**.

- Some functions of the Wayland client do not work.
  - **Pop-up windows do not open when right-clicking, etc.**

- Copy-and-paste and drag-and-drop functions do not work.
  - **Commands in this document need to be entered with the keyboard**.

These will be supported in the near future, so if you are interested, please join us in development.

## Purpose
The purpose of this tutorial is to learn **how to develop 3D apps on Zwin** by modifying and running a 3D client app that supports the Zwin protocol.

This tutorial does **NOT** aim to **build a 3D app from scratch**.
Instead, you will make modifications to already existing resources and learn how the changes are reflected.
We will be preparing a tutorial on creating a 3D app from scratch in the near future, so please wait a bit!
You can find updates on [Twitter](https://twitter.com/zwin_project).

With Zwin, instead of making a "Big App" that takes up the entire space, you can make a **small** app that takes up part of the space. Being small, you can focus on only a few features.

Zwin allows you to create 3D apps through a relatively low-layer OpenGL ES-like protocol. See [Rendering Scheme](/en/what_is_it/rendering_scheme) for more information about rendering apps.

Here we will create an application using [Zukou](https://github.com/zwin-project/zukou), a simple client library.

## Open the document in a browser
Since Zen is a desktop environment, you can open a browser.
For example, if you have [Google Chrome](https://www.google.com/chrome/) installed, try adding Chrome as a launcher icon as follows.

```:~/.config/zen-desktop/config.toml
# ..
#

[[favorite_apps]]
name = "Google Chrome"
exec = "google-chrome 'https://google.com' --enable-features=UseOzonePlatform --ozone-platform=wayland --window-size=1000,800 --disable-gpu" # required
icon = "/path/to/icon" # svg / png / gltf

#
# ..
```

Click on the Google Chrome icon in the launcher to open a browser.
Open this document in the browser and you can work through the document without ever leaving the VR space!

![launcher_chrome](launcher_chrome.png "image_tooltip")

## Build and install
First, open a terminal for building, installing, and editing code.

If you do not have a terminal icon, set one up. For example,
```:~/.config/zen-desktop/config.toml
# ..
#

[[favorite_apps]]
name = "Terminal"
exec = "weston-terminal" # required
icon = "/path/to/icon" # svg / png / gltf

#
# ..
```

If you save this configuration and start Zen, a terminal icon will appear.
Click on it to open the terminal.

![launcher_terminal](launcher_terminal.png "image_tooltip")

Once the terminal is open, type in the command.
In the Beta version of Zwin, the following notes apply.
- Non-Wayland client 2D apps such as VSCode are not yet supported, so please **use a CUI editor such as Vim or nano.**
- Copy-and-paste is not yet supported, so **type your characters with the keyboard**.

First, clone the repository for this tutorial.
```
$ git clone https://github.com/zwin-project/celestial-body-app
$ cd celestial-body-app
```

Build and install.
```
$ meson build
$ ninja -C build install
```

## Running the 3D app
After successful build and installation, you should have a binary ``celestial-body-app`` at hand, so let's run it.
```
$ celestial-body-app
```

![moon](moon_app.png "image_tooltip")

You can easily launch the app in this way.

Close the app with `Ctrl + C` or `pkill celestial-body-app`, etc.

## Simple logic changes

Now, let's change the Texture and nameplate name first as a simple change, just to try it out.

```
$ cd celestial-body-app
$ vim . /src/main.cc # You don't have to use vim. Use your favorite CUI editor.
```

Modify the ``main`` function as follows.
```:src/main.cc
// ..
//

int
main(int argc, char const* argv[])
{
  // Change the following two lines
  std::string path("./assets/earth.jpg");
  std::string name("Earth");
  // std::string path("./assets/moon.jpg");
  // std::string name("Moon");
  CelestialBody celestial_body(path.c_str());

  if (!celestial_body.Init(name, 0.1)) return EXIT_FAILURE;

  return celestial_body.Run();
}

```


Build and run again with the following command.
```
$ ninja -C build install
```
```
$ celestial-body-app
```

![earth](earth_app.png "image_tooltip")

It's changed to earth!!!

## Advanced logic changes
In the previous section, we only changed simple parameters that could be changed in the configuration file, but the source code of the app is in C++, and of course complex logic can be added.

The limiting factor in creating an app in Zwin is the protocol regarding OpenGL ES-like drawing and input.
The relationship between the protocol and the client is described in [What is Zwin?](/en/what_is_it/what_is_zwin) document.
See [here](https://github.com/zwin-project/zwin/tree/draft/protocol) for the actual contents of the protocol.

Let's allow the earth to rotate with Ray's scrolling.
First, we need to make sure that the application can receive input.
To do so, we set an input region called Region to the 3D app.
This is like a Collider in a game engine like Unity.
In the code, make the following changes.

```:src/main.cc
// ..
//
//

class CelestialBody final : public zukou::IBoundedDelegate,
                            public zukou::ISystemDelegate
{
  bool Init(std::string& name, float radius)
  {
    if (!system_.Init()) return false;
    if (!bounded_.Init(glm::vec3(radius))) return false;
    if (!region_.Init()) return false;

    bounded_.SetTitle(name);

    // Add these two lines.
    region_.AddCuboid(glm::vec3(radius), glm::vec3(0), glm::quat(glm::vec3(0)));
    bounded_.SetRegion(&region_);

    auto jpeg_texture = std::make_unique<JpegTexture>(&system_);

    if (!jpeg_texture->Init()) return false;
    if (!jpeg_texture->Load(texture_path_)) return false;

    sphere_.Bind(std::move(jpeg_texture));

    return true;
  }
};

//
//
// ..
```

Regions can have additional rectangular or spherical regions.
(We plan to make it possible to define more complex input regions in the future!)

Here we are adding a rectangular (cubic) region.
The rectangle is placed at the origin and its radius is matched to the radius of the planet.
We set it to a 3D app (`bounded_`); Bounded is a type of 3D app; see [3D Window](/en/what_is_it/3d_window) for a detailed description of Bounded.

With Region attached, `RayAxisFrame` is called when Ray intersects with that region and a scrolling event occurs. This is an abstraction by a library called Zukou, and the behavior can actually be described using a header file generated from the [Zwin protocol](https://github.com/zwin-project/zwin/tree/draft/protocol). The protocol is not dependent on a specific language, so it is possible to implement a 3D application in another language.

```
// ..
//
//

  // Implement the content of the function.
  void RayAxisFrame(const zukou::RayAxisEvent& event) override
  {
    spin_angle_ += event.vertical;
    spin_angle_ %= 360;

    float theta = 2.0 * M_PI * spin_angle_ / 360.0;

    glm::mat4 transform = glm::rotate(glm::mat4(1), theta, glm::vec3(0, 1, 0));
    sphere_.Update(transform);

    bounded_.Commit();
  }

//
//

private:
 int spin_angle_ = 0; // Add this line.

//
//
// ..
```
As above, keep the current rotation angle (Degree) as `spin_angle_` and add the values of the scroll.
From this value, we find the radian rotation angle `theta`, calculate the matrix that rotates the planet `sphere_`, and update the matrix that sets the position of `sphere_`.
The `bounded_.Commit()` instruction is used to reflect the above changes in the drawing.
This instruction exists to control when the state is reflected, for example, when the state is being generated across frames, so that the intermediate state will not be drawn.

Build and execute the following command again.
```
$ ninja -C build install
```
```
$ celestial-body-app
```

![earth_scroll](earth_scroll_app.gif "image_tooltip")

Now we have a near-globe app that lets you rotate the planets by scrolling!
With Zwin, you can modify, build and run the app like this all within the VR space.

## Summary

As implemented above, Zwin allows you to implement **small** apps that occupy a specific space.

The benefits from a developer's perspective are as follows.
- You can modify, rebuild, and run the app entirely within the VR space.
- Smaller apps can be created.
  - You don't have to build "everything" like you do with existing VR "Big Apps"!
  - In the current VR, for example, to make an app that displays a clock, you have to make a room. You want to make just a clock, right?

Users can also combine these small apps.
Since Zwin is a newborn project, there are not enough 3D apps yet.
Please try to make small apps.

Let's create apps that embody the UNIX philosophy "[Do one thing, and do it well.](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well)" and make XR open.
