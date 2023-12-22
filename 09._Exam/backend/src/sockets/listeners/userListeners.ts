import type { Socket } from "socket.io";
import socketRepository from "../../repositories/socketRepository.ts";
import { IO, SocketConnection } from "../../types/general.ts";
import conversationRepository from "../../repositories/conversationRepository.ts";

export default (socket: Socket, io: IO) => {
  const addUser = async (payload: SocketConnection) => {
    const conn = socketRepository.addConnection(payload);
    if (conn) {
      const convs = await conversationRepository.getConversationsByUserId(
        payload.userId
      );

      convs.forEach((conv) => socket.join(`conv-${conv.id}`));
    }
  };

  socket.on("user:add", addUser);
};
