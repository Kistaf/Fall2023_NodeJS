import { nanoid } from "nanoid";
import { friends, users } from "../lib/drizzle/schema.ts";
import { db } from "../lib/drizzle/db.ts";
import { and, eq, or } from "drizzle-orm";
import { Friend } from "../types/entities.ts";

type FriendRepository = {
  getFriends: (userId: string) => Promise<Friend[]>;
  addFriend: (userId: string, friendEmail: string) => Promise<void>;
  updateFriend: (
    userId: string,
    friendId: string,
    status: "REQUESTED" | "ACCEPTED" | "DENIED"
  ) => void;
  removeFriend: (userId: string, friendId: string) => void;
};

const createFriendRepository = (): FriendRepository => {
  const getFriends = async (userId: string) => {
    const queriedFriends = await db.query.friends.findMany({
      where: or(eq(friends.senderId, userId), eq(friends.receiverId, userId)),
    });
    return queriedFriends;
  };

  const addFriend = async (userId: string, friendEmail: string) => {
    const userFriend = await db.query.users.findFirst({
      where: eq(users.email, friendEmail),
    });

    await db.insert(friends).values({
      id: nanoid(),
      senderId: userId,
      receiverId: userFriend.id,
    });
  };

  const updateFriend = async (
    userId: string,
    friendId: string,
    status: "REQUESTED" | "ACCEPTED" | "DENIED"
  ) => {
    await db
      .update(friends)
      .set({
        status: status,
        updatedAt: new Date(),
      })
      .where(
        or(
          and(eq(friends.senderId, userId), eq(friends.receiverId, friendId)),
          and(eq(friends.senderId, friendId), eq(friends.receiverId, userId))
        )
      );
  };

  const removeFriend = async (userId: string, friendId: string) => {
    await db
      .delete(friends)
      .where(
        or(
          and(eq(friends.senderId, userId), eq(friends.receiverId, friendId)),
          and(eq(friends.senderId, friendId), eq(friends.receiverId, userId))
        )
      );
  };

  return {
    getFriends,
    addFriend,
    updateFriend,
    removeFriend,
  };
};

export default createFriendRepository();
