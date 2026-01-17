import { io } from "socket.io-client";
import { store } from "./store";
import { socketClockIn, socketClockOut } from "../features/attendance/attendanceSlice";

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

  socket.on("attendance:clockIn", (data) => {
    store.dispatch(socketClockIn(data));
  });
  socket.on("attendance:clockOut", (data) => {
    store.dispatch(socketClockOut(data));
  });
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
