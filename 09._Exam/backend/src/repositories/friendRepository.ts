import { nanoid } from "nanoid";
import { friends, users } from "../lib/drizzle/schema.ts";
import { db } from "../lib/drizzle/db.ts";
import { and, eq, or } from "drizzle-orm";
import { Friend } from "../types/entities.ts";

type FriendRepository = {
  getFriends: (userId: string) => Promise<Friend[]>;
  requestFriend: (
    userId: string,
    friendEmail: string
  ) => Promise<{ error?: string; success?: string; friend?: Friend }>;
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

  // TODO: Move logic out of repository and into service
  const requestFriend = async (
    userId: string,
    friendEmail: string
  ): Promise<{ error?: string; success?: string; friend?: Friend }> => {
    const userFriend = await db.query.users.findFirst({
      where: eq(users.email, friendEmail),
    });

    if (!userFriend) {
      return {
        error: "No user with the given email",
      };
    }
    if (userFriend.id === userId) {
      return {
        error: "You cannot add yourself as friend",
      };
    }

    const alreadyFriends = await db.query.friends.findFirst({
      where: or(
        and(
          eq(friends.senderId, userId),
          eq(friends.receiverId, userFriend.id)
        ),
        and(eq(friends.senderId, userFriend.id), eq(friends.receiverId, userId))
      ),
    });

    if (alreadyFriends) {
      return {
        error:
          alreadyFriends.status === "ACCEPTED"
            ? "You are already friends with this user"
            : "You already have a pending friend request with this user",
      };
    }

    const friendRequest = await db
      .insert(friends)
      .values({
        id: nanoid(),
        senderId: userId,
        receiverId: userFriend.id,
        status: "REQUESTED",
      })
      .returning();

    return {
      success: "Friend request sent",
      friend: friendRequest[0],
    };
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
    requestFriend,
    updateFriend,
    removeFriend,
  };
};

export default createFriendRepository();
