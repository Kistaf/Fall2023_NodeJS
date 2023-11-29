import { z } from "zod";
import api from "../utils/api";
import type { FriendsStore } from "../utils/types";

type FriendService = {
  getFriends: () => Promise<FriendsStore>;
  requestFriend: (friendEmail: string) => Promise<string>;
};

const FriendAddSchema = z.object({
  email: z.string().min(1).email(),
});

const createFriendService = (): FriendService => {
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

  return {
    getFriends,
    requestFriend,
  };
};

export default createFriendService();
