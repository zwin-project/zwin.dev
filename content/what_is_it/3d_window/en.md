# 3D Window

This section describes the 3D window that is the core of the Z Window System.


## Bounded Window / Expansive Window

There are two types of 3D windows: bounded 3D windows and expansive 3D windows.

A bounded 3D window is a 3D window that has a size in space. It can be moved, rotated, or resized.
In v0.1, zen-object-viewer is provided as a sample application for ZIGEN with a bounded 3D window.


![alt_text](image1.png "image_tooltip")


Boards in Zen also behave like bounded 3D windows, although the implementation is different under the hood.

An expansive 3D window, on the other hand, has no size and occupies the entire space.

In v0.1, we provide Zennist (Zen's default background app) as a sample app responsible for drawing distant scenery, floors, ceilings, and so on. You can change the view by launching another application with an expansive 3D window.


![alt_text](image2.png "image_tooltip")

