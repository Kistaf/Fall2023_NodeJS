import { Request, Response } from "express";
import friendRepository from "../repositories/friendRepository.ts";
import { io } from "../sockets/sockets.ts";
import socketRepository from "../repositories/socketRepository.ts";

type MessageService = {
  getFriends: (req: Request, res: Response) => void;
  requestFriend: (req: Request, res: Response) => void;
};

const createFriendsService = (): MessageService => {
  const getFriends = async (req: Request, res: Response) => {
    const userId = req.userId;
    const friends = await friendRepository.getFriends(userId);
    const filteredFriends = {
      sent: friends.filter(
        (f) => f.senderId === userId && f.status === "REQUESTED"
      ),
      received: friends.filter(
        (f) => f.receiverId === userId && f.status === "REQUESTED"
      ),
      friends: friends.filter((f) => f.status === "ACCEPTED"),
    };
    return res.send({ status: 200, data: filteredFriends });
  };

  const requestFriend = async (req: Request, res: Response) => {
    const userId = req.userId;
    const friendEmail = req.body.friendEmail;
    const friendRequest = await friendRepository.requestFriend(
      userId,
      friendEmail
    );
    if (friendRequest.error) {
      return res.status(400).send({ error: friendRequest.error });
    }

    const senderUserId = friendRequest.friend.senderId;
    const receiverUserId = friendRequest.friend.receiverId;
    const receivers = [senderUserId, receiverUserId]
      .map((id) => socketRepository.connByUserId(id)?.socketId)
      .filter((entry) => entry !== undefined);

    io.to(receivers).emit("friend:add", friendRequest.friend);

    return res.send({
      success: "Friend request sent",
      data: friendRequest.friend,
    });
  };

  return {
    getFriends,
    requestFriend,
  };
};

export default createFriendsService();
