import type { Socket } from "socket.io";
import type { Connection } from "../../types/sockets.ts";
import { connections } from "../sockets.ts";

export default (socket: Socket) => {
  const addUser = (payload: Connection) => {
    if (!connections.some((conn) => conn.socketId === payload.socketId))
      connections.push(payload);
  };

  socket.on("user:add", addUser);
};
