import { Request, Response } from "express";
import friendRepository from "../repositories/friendRepository.ts";
import { io } from "../sockets/sockets.ts";
import socketRepository from "../repositories/socketRepository.ts";
import userRepository from "../repositories/userRepository.ts";

const createFriendsService = () => {
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

    try {
      const otherUserExists = await userRepository.userByEmail(friendEmail);
      if (!otherUserExists) {
        throw new Error("No user with the given eamil");
      }

      if (otherUserExists.id === userId) {
        throw new Error("You cannot add yourself as friend");
      }

      const isAlreadyFriends = await friendRepository.isFriends(
        userId,
        otherUserExists.id
      );

      if (isAlreadyFriends) {
        throw new Error(
          isAlreadyFriends.status === "ACCEPTED"
            ? "You are already friends with this user"
            : "You already have a pending friend request with this user"
        );
      }

      const id = await friendRepository.createFriend(
        userId,
        otherUserExists.id
      );

      const friendRequest = await friendRepository.getFriendById(id);

      const senderUserId = friendRequest.senderId;
      const receiverUserId = friendRequest.receiverId;
      const receivers = [senderUserId, receiverUserId]
        .map((id) => socketRepository.connByUserId(id)?.socketId)
        .filter((entry) => entry !== undefined);

      io.to(receivers).emit("friend:add", friendRequest);

      return res.send({
        success: "Friend request sent",
        data: friendRequest,
      });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  };

  return {
    getFriends,
    requestFriend,
  };
};

export default createFriendsService();
