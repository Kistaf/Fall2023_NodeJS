import { get, writable } from "svelte/store";
import type { FriendFull, FriendsStore } from "../utils/types";
import user from "./authState";

function createFriendsStore() {
  const { subscribe, set, update } = writable<FriendsStore>({
    friends: [],
    received: [],
    sent: [],
  });

  return {
    subscribe,
    setFriends: (friends: FriendsStore) => set(friends),
    addFriend: (friend: FriendFull) => {
      const userId = get(user).userId ?? "";
      if (friend.status === "REQUESTED") {
        if (friend.senderId === userId) {
          update((f) => {
            f.sent.push(friend);
            return f;
          });
        } else {
          update((f) => {
            f.received.push(friend);
            return f;
          });
        }
      } else {
        update((f) => {
          f.friends.push(friend);
          return f;
        });
      }
    },
    removeFriend: (friendId: string) => {
      update((prev) => {
        const userId = get(user).userId ?? "";
        return {
          sent: prev.sent.filter(
            (entry) =>
              entry.id !== friendId &&
              entry.senderId === userId &&
              entry.status === "REQUESTED",
          ),
          received: prev.received.filter(
            (entry) =>
              entry.id !== friendId &&
              entry.receiverId === userId &&
              entry.status === "REQUESTED",
          ),
          friends: prev.friends.filter(
            (entry) => entry.id !== friendId && entry.status === "ACCEPTED",
          ),
        };
      });
    },
    acceptFriend: (friend: FriendFull) => {
      update((prev) => {
        return {
          sent: prev.sent.filter((entry) => entry.id !== friend.id),
          received: prev.received.filter((entry) => entry.id !== friend.id),
          friends: [...prev.friends, friend],
        };
      });
    },
  };
}

export default createFriendsStore();
