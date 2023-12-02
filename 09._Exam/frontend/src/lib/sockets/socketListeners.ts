import type { Socket } from "socket.io-client";
import toast from "svelte-french-toast";
import { get } from "svelte/store";
import friendsStore from "../../stores/friendsStore";
import sectionStore from "../../stores/sectionStore";
import type { FriendFull, Message } from "../../utils/types";
import conversationsStore from "../../stores/conversationsStore";
import authStore from "../../stores/authStore";

export function registerListeners(socket: Socket) {
  socket.on("friend:request", (payload: FriendFull) => {
    const currentSection = get(sectionStore);
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

  socket.on("message:new", (payload: Message) => {
    const selectedConv = get(conversationsStore).selectedConversation;
    const userId = get(authStore).userId;
    const isReceiver = payload.authorId !== userId ? true : false;

    if (
      !selectedConv ||
      (isReceiver && selectedConv.id !== payload.conversationId)
    ) {
      toast(`You have received a new message from ${payload.author.email}`);
    }

    conversationsStore.addMessage(payload);
  });
}
