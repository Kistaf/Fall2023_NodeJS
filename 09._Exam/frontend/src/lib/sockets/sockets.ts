import { io } from "socket.io-client";
import type { Friend } from "../../utils/types";
import friendsStore from "../../stores/friendsStore";
import { get } from "svelte/store";
import sectionState from "../../stores/sectionState";
import { toast } from "svelte-french-toast";
import authState from "../../stores/authState";

const socket = io(`${import.meta.env.VITE_API_URL}`, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket"],
});

socket.on("connect", () => {
  socket.emit("user:add", {
    socketId: socket.id,
    userId: get(authState).userId,
  });
});

socket.on("friend:add", (payload: Friend) => {
  const currentSection = get(sectionState);
  if (currentSection !== "friends") {
    toast("New friend request", {
      icon: "🙋🏼‍♂️",
    });
  }

  friendsStore.addFriend(payload);
});

export default socket;
