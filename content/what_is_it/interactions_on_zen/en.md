# Interactions on Zen

Zen is our reference compositor for Zwin (See [What is Zwin?](/what_is_it/what_is_zwin)).

We designed it for the prolonged and extensive workflow of mouse/keyboard VR. 


## Ray

[https://www.youtube.com/watch?v=bhkqvm2oHdc](https://www.youtube.com/watch?v=bhkqvm2oHdc)

In VR, you will interact with 3D objects through the Ray. Ray is a common technique in VR; the difference is that you operate Ray in Zen with a regular mouse/trackpad. For example, when you move a mouse right, Ray moves right, too; move the mouse up, and Ray goes up. On 2D windows, Ray behaves just like a normal cursor.


## Board

Board is the concept that connects the conventional 2D world and our 3D interfaces.

In VR, Board behaves like flexible virtual displays or planes that 2D windows snap to. You can move them, increase/decrease them, and resize them. 


![alt_text](image1.png "image_tooltip")


In 2D screens, multiple Boards get combined inside a single screen, and you can easily swap the displayed Board. It's like a virtual desktop in Windows/Ubuntu or Spaces in macOS.


![alt_text](image2.png "image_tooltip")


(prototype design shown; the look might differ in the released version)

Board allows easy 2D window management on both VR/2D screens.

We plan to make Board 'minimizable' for even better window management, although it's not implemented yet in the v0.1 release.


## Space (under development)

Space is a concept for swapping multiple environments easily. A space corresponds to one whole 'environment' or 'scene.' You would be able to open a single expansive 3D window and many bounded 3D windows inside a single Space, and swap Space to completely switch the scenery.

Space is not implemented in the v0.1 release, and its behavior might change over development.


![alt_text](image3.png "image_tooltip")
