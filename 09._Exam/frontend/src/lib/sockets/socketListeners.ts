import type { Socket } from "socket.io-client";
import toast from "svelte-french-toast";
import { get } from "svelte/store";
import friendsStore from "../../stores/friendsStore";
import sectionState from "../../stores/sectionState";
import type { FriendFull } from "../../utils/types";

export function registerListeners(socket: Socket) {
  socket.on("friend:request", (payload: FriendFull) => {
    const currentSection = get(sectionState);
    if (currentSection !== "friends") {
      toast("New friend request", {
        icon: "🙋🏼‍♂️",
      });
    }

    friendsStore.addFriend(payload);
  });

  socket.on("friend:remove", (payload: { id: string }) => {
    friendsStore.removeFriend(payload.id);
  });

  socket.on("friend:accept", (payload: { friend: FriendFull }) => {
    friendsStore.acceptFriend(payload.friend);
  });
}
