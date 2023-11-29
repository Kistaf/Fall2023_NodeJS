import { nanoid } from "nanoid";
import { friends } from "../lib/drizzle/schema.ts";
import { db } from "../lib/drizzle/db.ts";
import { and, eq, or } from "drizzle-orm";
import { Friend } from "../types/entities.ts";

const createFriendRepository = () => {
  const getFriends = async (userId: string, full: boolean = false) => {
    const queriedFriends = await db.query.friends.findMany({
      where: or(eq(friends.senderId, userId), eq(friends.receiverId, userId)),
      with: full
        ? { sender: true, receiver: true }
        : {
            sender: {
              columns: {
                id: true,
                email: true,
              },
            },
            receiver: {
              columns: {
                id: true,
                email: true,
              },
            },
          },
    });
    return queriedFriends;
  };

  const createFriend = async (userId: string, otherUserId: string) => {
    const friend = await db
      .insert(friends)
      .values({
        id: nanoid(),
        senderId: userId,
        receiverId: otherUserId,
        status: "REQUESTED",
      })
      .returning();
    return friend[0].id;
  };

  const isFriends = async (
    userId: string,
    otherUserId: string
  ): Promise<Friend> => {
    const friend = await db.query.friends.findFirst({
      where: or(
        and(eq(friends.senderId, userId), eq(friends.receiverId, otherUserId)),
        and(eq(friends.senderId, otherUserId), eq(friends.receiverId, userId))
      ),
    });
    return friend;
  };

  const getFriendById = async (friendId: string, full: boolean = false) => {
    const friend = await db.query.friends.findFirst({
      where: eq(friends.id, friendId),
      with: full
        ? { receiver: true, sender: true }
        : {
            receiver: { columns: { id: true, email: true } },
            sender: { columns: { id: true, email: true } },
          },
    });
    return friend;
  };

  const deleteFriendById = async (friendId: string) => {
    await db.delete(friends).where(eq(friends.id, friendId));
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
    updateFriend,
    removeFriend,
    createFriend,
    isFriends,
    deleteFriendById,
    getFriendById,
  };
};

export default createFriendRepository();
