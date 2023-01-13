# Rendering scheme

Zwin uses a different rendering method than the conventional VR solutions.


## Rendering of the application

In a conventional VR solution, VR apps receive viewpoint information from the system, draw an object using their own virtual camera, and return the resulting two-dimensional image x 2 (for both eyes) to the system.

![alt_text](image1.png "image_tooltip")


In Zwin, on the other hand, each VR app does not render the image by itself. Instead, **the VR app sends the object's vertex data, mesh data, texture, shaders, etc., to the compositor.** The compositor's virtual camera then draws all the virtual objects together.

![alt_text](image2.png "image_tooltip")


There are several advantages to this mechanism. For example, suppose an application suddenly stops responding. With the conventional rendering method, the app's camera is responsible for drawing and updating the image. If the app stops responding, moving your head will not update the perspective, causing discomfort.

On the other hand, in our method, **the compositor is responsible for drawing and updating the viewpoint.** So even if an app stops responding, the view on the headset will be updated according to the perspective (unless the compositor stops responding.) This ensures that the overall experience is not interrupted by "bad apps."


## Remote rendering

The flow for viewing the Zen view with Meta Quest is as follows; install an app for Meta Quest called **Zen Mirror** on your Quest, and set Zen on PC to VR mode with the app on the Quest open. The two will automatically start communicating within LAN, and Quest's Zen Mirror will display the view of Zen.

There are some existing solutions for displaying PC VR applications to Quest like this, including Oculus Link and ALVR. But Zen/Zwin takes a different approach here as well.

In typical solutions, the VR headset sends viewpoint information to the PC every frame, and the stereo images rendered by the PC are sent over the network every frame. Therefore, the update of images may be delayed with bad networks, which may cause VR sickness.

![alt_text](image3.png "image_tooltip")


The Zen/Zwin, on the other hand, sends the object's vertex data, mesh data, shaders, etc., passed from the application directly to the headset over the network. The headset is responsible for rendering each frame.

![alt_text](image4.png "image_tooltip")

Thanks to this mechanism, **even if the network quality is poor and there is a delay in communication, the headset alone can update the perspective every frame**. Information is sent over the network only when the application wants to update the shape or appearance of an object. At other times, it does not occupy network bandwidth.

Also, since we use the GPU on the headset for camera rendering, there is no need for a powerful GPU on the PC side. This enables using Zen/Zwin in VR even with a cheap laptop.

The mechanism of Zwin enables a comfortable VR experience even with low-quality PCs, low-quality applications, and low-quality networks.
