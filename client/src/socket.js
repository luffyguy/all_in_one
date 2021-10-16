import * as io from "socket.io-client";

const socket = io("http://localhost:8000");
console.log(socket);
export default socket;
