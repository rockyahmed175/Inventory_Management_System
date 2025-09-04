import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export function connectSocket(token) {
  if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export function onEvent(event, callback) {
  socket.on(event, callback);
}

export function offEvent(event, callback) {
  socket.off(event, callback);
}

export function emitEvent(event, data) {
  socket.emit(event, data);
}

export default socket;
