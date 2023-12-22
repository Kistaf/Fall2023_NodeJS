import { Request, Response } from "express";
import messageRepository from "../repositories/messageRepository.ts";
import { io } from "../sockets/sockets.ts";

const createMessageService = () => {
  const saveMessage = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { message, convId } = req.body;
    if (!message || !convId) {
      return res
        .status(400)
        .send({ error: "Missing required fields: message or convId" });
    }

    const createdMessageId = await messageRepository.saveMessage(
      userId,
      message,
      convId
    );

    if (!createdMessageId) {
      return res
        .status(500)
        .send({ error: "Something went wrong trying to create the message" });
    }

    const msg = await messageRepository.getMessageById(createdMessageId);

    io.to(`conv-${convId}`).emit("message:new", msg);
  };

  return {
    saveMessage,
  };
};

export default createMessageService();
