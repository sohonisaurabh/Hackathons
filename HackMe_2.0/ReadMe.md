# HackME 2.0 - XperienZ track

## About the event

HackMe 2.0 was different from a conventional Hackathon. It was not a 24hr or 48 hr event. All the participants had to tackle gradual challenges over a course of 9 weeks, or I would say 9 weekends ;). There were 3 tracks viz. Data2Insights, XperienceZ and NewFundamentals. Our team was part of the XperienZ track where in the challenges were targetted at building unique kind of user experience using latest Human Computer Interaction (HCI) techniques.

## Inspiration:
 
In the first phase of HackMe 2.0, me and my team mate, [Ramya Sudarshan](https://github.com/ramyaps94), were asked to research on the history of HCI and share some insights into different HCI methods being used today. Be it smartphones, tablets, computers, television sets, fitness gadgets, etc. we realized that HCI has now become the integral part of most of our daily activities. With recent advancements in Virtual Reality (VR) and Augmented Reality (AR), we were more inclined towards creating a dream like experience with some sort of an application built using VR. We also wanted to use automation or artificial intelligence but were not very sure how to do it.
I remember sharing this idea with a fellow colleague and we thought over many different ideas in a long meeting. Some of them being:

  1. Building a car simulator with scene rendered from an actual car being driven on the street
  2. Building a home security system
  3. Building a web application which will stream recording from an event, and something on top of it
  
Soon we realized that option 1 was not feasible and option 2 was already implemented in a few other applications so we agreed on option 3. But we were not sure what to do with the live stream. Also, I had almost no experience in developing Android/iOS application and using Cordova to port our web application did not create much of an excitement! Then the real inspiration arrived when we thought, why not create a web application! All job done by the browser and JavaScript being so powerful, can be used to build any sort of application hypothetically!

Challenge accepted and the journey here after turned to be very exciting with WebRTC, Three.js, HTML5 Device Orientation API, socket.io, NodeJS and Arduino Firmata with Johnny-Five coming in handy. The final product we eventually came up being a ‘Live Virtual Tour Web Application’.

## Application Architecture

High level architecture of our web application was as shown below:

![application-architecture](https://raw.githubusercontent.com/sohonisaurabh/Hackathons/master/HackMe_2.0/image-resources/application-architecture.png)
 
Our web application had following major modules:

  1. Live stream or stream a recording from one client device to other client using WebRTC
  2. Projecting and rendering the live stream into stereoscopic frame with separation for left and right eye. Such type of render was used to add various effects and make the render compatible for a VR headset.
  3. Detecting gestures (head movements in our case) of user viewing the stream in VR headset by making use of the orientation of device.
  4. Communicating orientation information to a microcontroller to rotate the camera (recording stream) according to the head movement of user.
  5. Binding every piece together using a HTTPS server and real time communication using web sockets.


## Libraries used:
 
As stated above, we used a bunch of libraries for realizing the concept into a portable web application. Fortunately for us, every library used was supported in Chrome browser, chrome for android (Android version >= 4.0) and Safari on iOS (iOS version >= 8.0). An introduction to libraries used is given below:
 
### 1. WebRTC
  
  WebRTC stands for Web Real Time Communication. This API is aimed at facilitating plug-in free video and data communication between client machines (most of the time without the interference of server using STUN protocol).
  
  WebRTC makes use of MediaStream API and implements following:
   a. Media capture through MediaStream API
   b. RTCPeerConnection API for real time media communication between clients with facilities of data encryption and bandwidth management
   c. RTCDataChannel API for real time generic data communication between clients
   
We created a simple video chat application using tutorial on webRTC codelab. Few snap shots are given below:

   a. Snapshot taken on desktop
   
![snapshot-desktop](https://raw.githubusercontent.com/sohonisaurabh/Hackathons/master/HackMe_2.0/image-resources/snapshot-desktop.png)

   b. Snapshot taken on android phone (Due to screen height limitation, only remote user’s snap is captured)
   
![snapshot-android](https://raw.githubusercontent.com/sohonisaurabh/Hackathons/master/HackMe_2.0/image-resources/snapshot-android.png)


### 2. Three.js
  
  Three.js is a cross-browser JavaScript library used to create and display animated 3D graphic content in a web browser. The render engine used by Three.js is WebGL. A typical Three.js application starts with creating a scene with a 3D object for e.g.: A sphere or a cube. Then some graphic content is imposed upon this object and viewed through a camera placed strategically to  create an immersive effect. There are also variety of filter available for smoothening and sharpening of objects placed into scene for creating a differential effect based on illumination.
 
  We started with render of solid sphere on black colored canvas. The result looked like something shown below:
  
![threejs-basic-render](https://raw.githubusercontent.com/sohonisaurabh/Hackathons/master/HackMe_2.0/image-resources/threejs-basic-render.png)

  Our next task was to render a video into something when looked from a VR headset would create a 3D effect (A stereoscopic video stream). Luckily, Three.js helped us with a utility to for this task and came up with an application demonstrated in this graphic given below:
  
![threejs-video-render](https://raw.githubusercontent.com/sohonisaurabh/Hackathons/master/HackMe_2.0/image-resources/threejs-video-render.gif)
  
  Complete video can be found here [threejs-video-render](https://youtu.be/6x-yhNNyspI).
  
  
### 3. HTML5 Device Orientation API:
 
  HTML5 Device Orientation API provides information about the orientation and movement of a device. Information comes from the positional sensors such as compasses, gyroscopes and accelerometers. Via this API, a web app can access and make use of information about how a device is physically oriented in space.
  
 The HTML5 Device Orientation API specifies three events, which are outlined below:
 
 a. deviceorientation – Fired when significant orientation occurs
 b. compassneedscalibration – Fired when compass needs calibration and calibration will provide more accurate data
 c. devicemotion – Fired regularly with information regarding the motion of device
 
 This was the toughest task! The module was complex as the device orientation API returned raw values every 10th of a second and our application full of data and no useful insight. To start with, we thought of mapping those values into a one dimensional slider. The demonstration is shown in the graphic below:

![device-orientation-demo](https://raw.githubusercontent.com/sohonisaurabh/Hackathons/master/HackMe_2.0/image-resources/device-orientation-demo.gif)

  Complete video can be found here [html5-device-orientation-demo](https://youtu.be/agAQNQGOyzs).
 
### 4.Socket.io
  
  In a conventional web application, communication between a client and a server is driven by the client. Until and unless the client makes a request to the server, the server doesn’t interact or send any kind of data to any client machine. The role of server is to respond to client requests based on authorization, authentication and the type of data expected in response. Socket.io enables real time bi-directional communication. In this type of application, even server can request for some kind of information from the client and client may choose to respond. This communication is event based.
  WebRTC internally uses socket.io for building a connection between peers and signaling live events of connect, disconnect, data transfer, media transfer, etc. We also used socket.io to send custom signals from one device to other in our web application.
  
### 5. Arduino Firmata and Johnny-Five
  
  Interface with hardware elements such as a motor involved the use of a micro controller. We made use of Arduino Uno development board with a stepper motor coupled with L293D H Bridge IC.
Firmata is a generic protocol for communicating with micro controllers from software on a host computer. The way this works, is that you install the Firmata software on your Arduino board and you can control the Arduino by sending it Firmata instructions over the Serial port. There are Firmata implementations available in most languages, we used C++.The Firmata library for Node.js is called Firmata. If installed you can use to send instructions directly to your Arduino. This means that you now handle all your Microcontroller-logic directly from your Node.js.
  Built on top of Firmata, Johnny-Five is a protocol and a framework used for IoT and Robotics applications. Using Johnny-Five, interfacing our 4 wired stepper motor was a piece of cake!
  
  
## Running the application on localhost

### Dependencies

* Openssl [https://www.openssl.org/] for using self-signed certificate to configure https server on localhost.

To run the application, execute following steps:

  a. Navigate to code base root folder. Execute command: npm install
  b. To start https local server, execute command: node server.js
  c. Server will start on localhost on port no: 8443. Open browser and type this URL to open the application:
https://localhost:8443/index.html
  
  
## Application Demo

Second phase of HackMe 2.0 involved into proof of concepts and demo applications involving all libraries/frameworks listed above. Now bracing the beginning of third phase, we had to wired everything together and create a unified application. More work onto weekends certainly, but this was more fun.

And we managed to come up with a crude form of our web application. A very short demonstration can be found in the below:

![application-demo](https://raw.githubusercontent.com/sohonisaurabh/Hackathons/master/HackMe_2.0/image-resources/application-demo.gif)

Complete video can be found here [application-demo](https://youtu.be/nuVtfEzsLxA).
