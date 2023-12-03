import api from "../utils/api";
import type { Conversation } from "../utils/types";

const createConversationService = () => {
  const getConversations = async () => {
    const res = await api.conversations.fetchConversations();
    const data = await res.json();

    if (!res.ok) return {} as Conversation[];
    const conversations: Conversation[] = data.data;
    return conversations;
  };

  const createConversation = async (selected: string[]) => {
    try {
      const res = await api.conversations.createConversation(selected);
      const data = await res.json();

      if (!res.ok) return Promise.reject(data.error);
      return Promise.resolve(data.success);
    } catch (error) {
      console.log(error);
      return Promise.reject("Failed to create conversation");
    }
  };
  return {
    getConversations,
    createConversation,
  };
};

export default createConversationService();
