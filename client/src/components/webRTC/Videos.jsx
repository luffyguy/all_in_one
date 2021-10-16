import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import socket from "../../socket";
import { Videocam, VideocamOff, Mic, MicOff } from "@material-ui/icons";

const Videos = () => {
  const [stream, setStream] = useState();
  const [roomId, setRoomId] = useState("");
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const url = window.location.href;
    const room_id = url.substr(url.lastIndexOf("/") + 1, url.length);
    setRoomId(room_id);
    const peer = new Peer();
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((currentStream) => {
        myVideo.current.srcObject = currentStream;

        peer.on("call", (call) => {
          call.answer(currentStream);
          call.on("stream", (userVideoStream) => {
            userVideo.current.srcObject = userVideoStream;
          });
        });

        peer.on("open", (id) => {
          socket.emit("join-room", room_id, id);
        });

        socket.on("user-connected", (userId) => {
          const call = peer.call(userId, currentStream);
          call.on("stream", (userVideoStream) => {
            userVideo.current.srcObject = userVideoStream;
          });
        });

        setStream(currentStream);
      })
      .catch((err) => {
        console.log("stream error", err);
      });
  }, []);

  function toggleVideoOpt(e, trackKind) {
    e.preventDefault();
    const currentStream = myVideo.current.srcObject;
    if (trackKind === "video") {
      currentStream.getVideoTracks().forEach(function (track) {
        if (track.kind === "video") {
          if (track.enabled) {
            //track.stop();
            track.enabled = false;
            setCamOn(false);
          } else {
            track.enabled = true;
            setCamOn(true);
          }
        }
      });
    } else if (trackKind === "audio") {
      currentStream.getAudioTracks().forEach(function (track) {
        if (track.kind === "audio") {
          if (track.enabled) {
            //track.stop();
            track.enabled = false;
            setMicOn(false);
          } else {
            track.enabled = true;
            setMicOn(true);
          }
        }
      });
    }
  }

  return (
    <>
      <div className="">
        <button
          className={camOn ? "btn-primary" : "btn-danger"}
          onClick={(e) => {
            toggleVideoOpt(e, "video");
          }}
        >
          {camOn ? <Videocam /> : <VideocamOff />}
        </button>
        <button
          className={micOn ? "btn-primary" : "btn-danger"}
          onClick={(e) => {
            toggleVideoOpt(e, "audio");
          }}
        >
          {micOn ? <Mic /> : <MicOff />}
        </button>
      </div>
      <div className="" id="video-player">
        <div className="row justify-content-center">
          <div className="col" id="video-col">
            <video
              id="my-video"
              playsInline
              muted
              autoPlay
              ref={myVideo}
              width="236px"
              height="135px"
            />
          </div>
          <div className="col" id="video-col">
            <video
              id="user-video"
              playsInline
              mute
              autoPlay
              ref={userVideo}
              width="236px"
              height="135px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos;
