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

  return {
    getConversations,
  };
};

export default createConversationService();
