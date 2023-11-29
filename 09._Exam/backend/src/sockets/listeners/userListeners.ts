import type { Socket } from "socket.io";
import socketRepository from "../../repositories/socketRepository.ts";
import { IO, SocketConnection } from "../../types/general.ts";

export default (socket: Socket, io: IO) => {
  const addUser = (payload: SocketConnection) => {
    const conn = socketRepository.addConnection(payload);
  };

  socket.on("user:add", addUser);
};
