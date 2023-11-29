import { get } from "svelte/store";
import user from "../../stores/authState";
import { socket } from "./sockets";

export const emitAddUser = () => {
  const userId = get(user).userId;
  socket.emit("user:add", {
    socketId: socket.id,
    userId: userId,
  });
};
