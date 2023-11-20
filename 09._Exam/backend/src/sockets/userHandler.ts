import type { Socket } from "socket.io";

export default (socket: Socket) => {
  const disconnect = () => {};
  socket.on("disconnect", disconnect);
};
