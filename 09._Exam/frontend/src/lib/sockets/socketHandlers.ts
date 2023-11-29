import { get } from "svelte/store";
import socket from "./sockets";
import user from "../../stores/authState";

export const emitAddUser = () => {
  const userId = get(user).userId;
  socket.emit("user:add", {
    socketId: socket.id,
    userId: userId,
  });
};
