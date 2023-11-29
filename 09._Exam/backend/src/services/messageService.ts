import { Request, Response } from "express";
import messageRepository from "../repositories/messageRepository.ts";

type MessageService = {
  saveMessage: (req: Request, res: Response) => void;
  getMessagesByChatId: (req: Request, res: Response) => void;
};

const createMessageService = (): MessageService => {
  const saveMessage = (req: Request, res: Response) => {};

  const getMessagesByChatId = async (req: Request, res: Response) => {
    const chatId = req.params.chatId;
    const userId = req.userId;
    const messages = await messageRepository.messagesByChatIdWithUser(
      chatId,
      userId
    );
    return res.send(messages);
  };

  return {
    saveMessage,
    getMessagesByChatId,
  };
};

export default createMessageService();
