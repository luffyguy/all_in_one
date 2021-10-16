import React, { useEffect, useState } from "react";
import Editor from "../compiler/Editor";
import VideoCall from "../webRTC/VideoCall";
import socket from "../../socket";

const Room = () => {
  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const id = url.substr(url.lastIndexOf("/") + 1, url.length);
    console.log(id);
    setRoomId(id);

    socket.emit("join-room", id, "user-id");
  }, []);

  return (
    <>
      <div className="container-md" id="room-view">
        <div className="row">
          <div>
            <Editor />
          </div>
          <div>
            <VideoCall />
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;