"use client"; // This ensures the component is a Client Component

import React, { useRef, useState, useEffect } from "react";
import SimplePeer from "simple-peer";

const signalingServer = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

const VideoChat = () => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [idToCall, setIdToCall] = useState("");
  const myVideo = useRef();
  const partnerVideo = useRef();
  const wsRef = useRef(null);

  useEffect(() => {
    if (!signalingServer) {
      alert("WebSocket URL is not defined");
      console.error("WebSocket URL is not defined");
      return;
    }

    wsRef.current = new WebSocket(signalingServer);

    wsRef.current.onmessage = (message) => {
      const { signal, from } = JSON.parse(message.data);
      if (signal && !peer) {
        answerCall(signal);
      } else if (peer) {
        peer.signal(signal);
      }
    };

    wsRef.current.onerror = (error) => {
      const ws = error.target;
      console.error("WebSocket error:", error);
      console.error("Message:", error.message);
      console.error("Type:", error.type);
      console.error("Target:", error.target); // This often contains the WebSocket object
      console.error("BufferedAmount:", ws.bufferedAmount);
      console.log("WebSocket URL:", signalingServer);
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      wsRef.current.close();
    };
  }, [peer]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  };

  const callUser = () => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ signal: data, to: idToCall }));
      } else {
        console.error("WebSocket is not open");
      }
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.on("error", (err) => console.error("Peer connection error:", err));

    setPeer(peer);
  };

  const answerCall = (signal) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ signal: data, to: idToCall }));
      } else {
        console.error("WebSocket is not open");
      }
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.on("error", (err) => console.error("Peer connection error:", err));

    peer.signal(signal);
    setPeer(peer);
  };

  return (
    <div>
      <div>
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{ width: "300px" }}
        />
        <video
          playsInline
          ref={partnerVideo}
          autoPlay
          style={{ width: "300px" }}
        />
      </div>
      <button onClick={startVideo}>Start Video</button>
      <input
        type="text"
        placeholder="ID to Call"
        value={idToCall}
        onChange={(e) => setIdToCall(e.target.value)}
      />
      <button onClick={callUser}>Call</button>
    </div>
  );
};

export default VideoChat;
