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
    // removeFriend: (friendId: string) =>
    //   update((prev) => prev.filter((friend) => friend.id !== friendId)),
  };
}

export default createFriendsStore();
