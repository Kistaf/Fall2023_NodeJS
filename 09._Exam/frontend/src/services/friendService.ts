import { z } from "zod";
import api from "../utils/api";
import type { FriendsStore } from "../utils/types";
import toast from "svelte-french-toast";

const FriendAddSchema = z.object({
  email: z.string().min(1).email(),
});

const createFriendService = () => {
  const getFriends = async () => {
    const res = await api.friends.fetchFriends();
    const data = await res.json();

    if (!res.ok) return {} as FriendsStore;
    const friends: FriendsStore = data.data;
    return friends;
  };

  const requestFriend = async (friendEmail: string) => {
    try {
      const dataValidated = FriendAddSchema.parse({ email: friendEmail });
      const res = await api.friends.requestFriend(dataValidated.email);
      const data = await res.json();

      if (!res.ok) {
        return Promise.reject(data.error);
      }
      return Promise.resolve(data.success);
    } catch (e) {
      return Promise.reject("Invalid email");
    }
  };

  const acceptFriendRequest = async (frqId: string) => {
    const res = await api.friends.acceptFriend(frqId);
    const data = await res.json();

    if (!res.ok) {
      return Promise.reject(data.error);
    }
    return Promise.resolve(data.success);
  };

  const deleteFriendRequest = async (frqId: string) => {
    const res = await api.friends.deleteFriend(frqId);
    const data = await res.json();

    if (!res.ok) {
      return Promise.reject(data.error);
    }
    return Promise.resolve(data.success);
  };

  return {
    getFriends,
    requestFriend,
    acceptFriendRequest,
    deleteFriendRequest,
  };
};

export default createFriendService();
