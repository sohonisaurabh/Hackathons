Device Orientation Tracking using HTML5 Device Orientation API


The HTML5 Device Orientation API specifies three events, which are outlined below:

a. deviceorientation – Fired when significant orientation occurs
b. compassneedscalibration – Fired when compass needs calibration and calibration will provide more accurate data
c. devicemotion – Fired regularly with information regarding the motion of device

This API returns raw values of different angles viz. alpha, beta and gamma defined below and illustrated in the figure:
a. Alpha - The direction, the device is facing with rotation allowed around Z axis. 
b. Beta – The direction, the device is facing when it is tilted from front to back
c. Gamma – The direction, the device is facing when the device is tilted left to right


Main.js in app prints alpha, beta and gamma values using by attaching event listener on ‘deviceorientation’.

Future implementation items:

1. Plugin with Arduino board to verify dynamic orientation values are received to the controller.
2. Code a learning machine to which will identify gestures based on training and test data.

