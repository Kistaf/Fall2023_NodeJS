import type { Socket } from "socket.io";
import messageRepository from "../../repositories/messageRepository.ts";
import socketRepository from "../../repositories/socketRepository.ts";
import { IO } from "../../types/general.ts";
import { ChatMessagePayload } from "../../types/payload.ts";

export default (socket: Socket, io: IO) => {
  const sendMessage = async (payload: ChatMessagePayload) => {
    // const receiver = socketRepository.connByUserId(payload.receiverId);
    // const success = await messageRepository.saveMessage(payload);
    // if (success) {
    //   io.to(receiver.socketId).emit("chat:message:receive", {
    //     publisherId: payload.publisherId,
    //     message: payload.message,
    //     publishedAt: payload.publishedAt,
    //   });
    // }
  };

  socket.on("chat:message:sent", sendMessage);
};
