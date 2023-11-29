import { Request, Response } from "express";
import friendRepository from "../repositories/friendRepository.ts";
import { io } from "../sockets/sockets.ts";
import userRepository from "../repositories/userRepository.ts";
import { findActiveReceivers } from "../utils/sockets.ts";

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
        throw new Error("No user with the given email");
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
      const activeReceivers = findActiveReceivers([
        senderUserId,
        receiverUserId,
      ]);

      io.to(activeReceivers).emit("friend:request", friendRequest);

      return res.send({
        success: "Friend request sent",
        data: friendRequest,
      });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  };

  const acceptFriend = async (req: Request, res: Response) => {
    const friendId = req.params.id;
    const updatedFriend = await friendRepository.updateFriend(
      friendId,
      "ACCEPTED"
    );
    if (!updatedFriend) {
      return res.status(400).send({ error: "Failed to delete friend" });
    }

    const friend = await friendRepository.getFriendById(friendId);

    const senderUserId = friend.senderId;
    const receiverUserId = friend.receiverId;
    const activeReceivers = findActiveReceivers([senderUserId, receiverUserId]);

    io.to(activeReceivers).emit("friend:accept", { friend });

    res.send({ success: "Successfully deleted friend" });
  };

  const deleteFriend = async (req: Request, res: Response) => {
    const friendId = req.params.id;
    const deletedFriend = await friendRepository.deleteFriendById(friendId);
    if (!deletedFriend) {
      return res.status(400).send({ error: "Failed to delete friend" });
    }

    const senderUserId = deletedFriend.senderId;
    const receiverUserId = deletedFriend.receiverId;
    const activeReceivers = findActiveReceivers([senderUserId, receiverUserId]);

    io.to(activeReceivers).emit("friend:remove", { id: deletedFriend.id });

    res.send({ success: "Successfully deleted friend" });
  };

  return {
    getFriends,
    requestFriend,
    acceptFriend,
    deleteFriend,
  };
};

export default createFriendsService();
