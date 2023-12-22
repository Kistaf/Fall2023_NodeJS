import { Request, Response } from "express";
import conversationRepository from "../repositories/conversationRepository.ts";
import { io } from "../sockets/sockets.ts";
import socketRepository from "../repositories/socketRepository.ts";

const createConversationService = () => {
  const getConversations = async (req: Request, res: Response) => {
    const userId = req.userId;
    const conversations = await conversationRepository.getConversationsByUserId(
      userId
    );

    res.send({
      success: "Successfully queried conversations",
      data: conversations,
    });
  };

  const createConversation = async (req: Request, res: Response) => {
    const userId = req.userId;
    const selected: string[] = req.body.selected;

    selected.push(userId);

    const convId = await conversationRepository.createConversation(selected);

    const convFull = await conversationRepository.getConversationByConvId(
      convId
    );

    const connIds = socketRepository.socketIdsFromUserIds(selected);

    connIds.forEach((connId) =>
      io.sockets.sockets.get(connId).join(`conv-${convId}`)
    );

    io.to(`conv-${convId}`).emit("conversation:create", convFull);

    res.send({ success: "Successfully created conversation", data: convFull });
  };

  return {
    getConversations,
    createConversation,
  };
};

export default createConversationService();
