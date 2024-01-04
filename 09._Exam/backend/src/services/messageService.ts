import { Request, Response } from "express";
import messageRepository from "../repositories/messageRepository.ts";
import { io } from "../sockets/sockets.ts";
import conversationRepository from "../repositories/conversationRepository.ts";

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

    res.send("Message sent");
  };

  const deleteMessage = async (req: Request, res: Response) => {
    const userId = req.userId;
    const messageId = req.params.id;

    const message = await messageRepository.getMessageById(messageId);

    if (!message) {
      return res.status(400).send({ error: "No message with the given ID" });
    }

    const conversation = await conversationRepository.getConversationByConvId(
      message.conversationId
    );

    if (message.authorId !== userId && conversation.creator.id !== userId) {
      return res
        .status(400)
        .send({ error: "Not allowed to delete this message" });
    }

    const deletedMessage = await messageRepository.deleteMessage(message.id);

    if (!deletedMessage) {
      return res.status(500).send({ error: "Failed to delete message" });
    }

    io.to(`conv-${conversation.id}`).emit("message:delete", message);

    res.send({ success: "Successfully deleted message" });
  };

  return {
    saveMessage,
    deleteMessage,
  };
};

export default createMessageService();
