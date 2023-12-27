import { Request, Response } from "express";
import conversationRepository from "../repositories/conversationRepository.ts";
import { io } from "../sockets/sockets.ts";
import socketRepository from "../repositories/socketRepository.ts";

const createConversationService = () => {
  const getConversation = async (req: Request, res: Response) => {
    const convId = req.params.id;

    const conversation = await conversationRepository.getConversationByConvId(
      convId
    );

    res.send({
      success: "Successfully queried conversation",
      data: conversation,
    });
  };

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

  const editConvName = async (req: Request, res: Response) => {
    const userId = req.userId;
    const convId = req.params.id;
    const convName = req.body.convName;

    try {
      const conversation = await conversationRepository.getConversationByConvId(
        convId
      );

      if (!conversation) {
        throw new Error("No conversation with the given convId", {
          cause: 400,
        });
      }

      if (conversation.creator.id !== userId) {
        throw new Error(
          "Only the creator of a conversation can change the conversation name",
          { cause: 400 }
        );
      }

      const updatedConv = await conversationRepository.editConvName(
        convId,
        convName
      );

      if (!updatedConv) {
        throw new Error(
          "Something went wrong trying to update the conversation name",
          { cause: 500 }
        );
      }

      const conv = await conversationRepository.getConversationByConvId(convId);

      io.to(`conv-${conv.id}`).emit("conversation:title:update", {
        convId: conv.id,
        title: conv.convName,
      });

      return res.send({
        success: "Successfully changed the conversation name",
        data: conv,
      });
    } catch (error) {
      return res.status(error.cause).send({
        error: error.message,
      });
    }
  };

  const createConversation = async (req: Request, res: Response) => {
    const userId = req.userId;
    const selected: string[] = req.body.selected;

    selected.push(userId);

    const convId = await conversationRepository.createConversation(
      selected,
      userId
    );

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
    getConversation,
    getConversations,
    createConversation,
    editConvName,
  };
};

export default createConversationService();
