import { Request, Response } from "express";
import conversationRepository from "../repositories/conversationRepository.ts";
import { findActiveReceivers } from "../utils/sockets.ts";
import { io } from "../sockets/sockets.ts";

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
    const { otherUserId } = req.body;

    if (!otherUserId) {
      return res
        .status(400)
        .send({ error: "Missing the ID of the second user" });
    }

    const hasConversationAlready = conversationRepository.hasConversation(
      userId,
      otherUserId
    );

    if (hasConversationAlready) {
      return res
        .status(400)
        .send({ error: "You already have a conversation with this person" });
    }

    const convId = await conversationRepository.createConversation(
      userId,
      otherUserId
    );

    const convFull = await conversationRepository.getConversationByConvId(
      convId
    );

    const receivers = findActiveReceivers([
      convFull.participantAId,
      convFull.participantBId,
    ]);

    io.to(receivers).emit("conversation:create", convFull);

    res.send({ success: "Successfully created conversation", data: convFull });
  };

  return {
    getConversations,
    createConversation,
  };
};

export default createConversationService();
