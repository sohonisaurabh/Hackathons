Video stream and playback using webRTC

WebRTC stands for Web Real Time Communication. This API is aimed at facilitating plug-in free video and data communication between client machines (most of the time without the interference of server using STUN protocol).
WebRTC makes use of MediaStream API and implements following:

a. Media capture through MediaStream API
b. RTCPeerConnection API for real time media communication between clients with facilities of data encryption and bandwidth management
c. RTCDataChannel API for real time generic data communication between clients

Sample app establishes RTCPeerConnection on same client machine and streams live video recording.

Steps to run the app are given below:

1. This app works on https server by creating a self-signed certificate. Make sure openssl is installed on server machine
2. Execute command given below to start local https server:
Node server.js
3. Navigate to https://localhost:8443/index.html to open the app in browser

Future Implementation items:
1. Live stream data and video from one client machine to another on local hotspot network
2. Implement STUN and TURN server to use public network for streaming of data and video.


