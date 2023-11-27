import { Request, Response } from "express";
import friendRepository from "../repositories/friendRepository.ts";

type MessageService = {
  getFriends: (req: Request, res: Response) => void;
  addFriend: (req: Request, res: Response) => Promise<void>;
};

const createFriendsService = (): MessageService => {
  const getFriends = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const friends = await friendRepository.getFriends(userId);
    return res.send({ status: 200, data: friends });
  };

  const addFriend = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const friendEmail = req.body.friendEmail;
  };

  return {
    getFriends,
    addFriend,
  };
};

export default createFriendsService();
