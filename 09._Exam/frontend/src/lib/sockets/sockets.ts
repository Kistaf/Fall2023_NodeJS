import { io } from "socket.io-client";
import { registerListeners } from "./socketListeners";
import { emitAddUser } from "./socketHandlers";

export const socket = io(`${import.meta.env.VITE_API_URL}`, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket"],
});

let registered = false;

socket.on("connect", () => {
  if (!registered) {
    registerListeners(socket);
    registered = true;
  }

  emitAddUser();
});
