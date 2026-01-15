import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
});

socket.on("connect_error", (err) => {
  console.error("SOCKET ERROR: ", err.message);
});

export const connectSocket = (token) => {
  if (socket.connected) return;

  socket.auth = { token };
  socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
