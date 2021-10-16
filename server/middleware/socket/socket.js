//operations of socket

const Socket = (io) => {
  io.on("connect", (socket) => {
    console.log("socket connected : " + socket.id);

    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-connected", userId);
      socket.on("write-text", (data) => {
        socket.to(roomId).emit("updated-text", data);
      });

      socket.on("send-output", (output) => {
        socket.to(roomId).emit("recieve-output", output);
      });
    });
  });
};

export default Socket;
