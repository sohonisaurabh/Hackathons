Stereoscopic video render using Three.js


The HTML5 Device Orientation API specifies three events, which are outlined below:

Three.js makes use of WebGL render engine to create stereoscopic images (and videos if generate enough frames per second) for creating an experience optimized for VR. For every animation created using Three.js, following basic components need to be created:

a. A Scene – This is like a canvas
b. A renderer – This is analogous to a painter
c. A Camera – These are all viewers observing the painting

This app renders a local video 2D by rendering it on a 3D sphere to create a stereo effect.

Known issues:

1. Render is done on a sphere while it should be on a rectangular object in the background
2. Position of camera object is restricting view of only partial frame of input video.
3. App doesn’t handle dynamic viewport.


Future implementation items:

1. Scene width and height should be dynamic and aspect ratio should be calculated accordingly.
2. Perform stereoscopic conversion using live streaming video as this will be the end solution thought.

