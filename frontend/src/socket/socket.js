import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  socket = io("http://localhost:5000/api");
  return socket;
};