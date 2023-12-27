import api from "../utils/api";
import type { Conversation } from "../utils/types";

const createConversationService = () => {
  const getConversation = async (convId: string) => {
    const res = await api.conversations.fetchConversation(convId);
    const data = await res.json();

    if (!res.ok) return {} as Conversation;
    const conversation: Conversation = data.data;
    return conversation;
  };

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
      return Promise.reject("Failed to create conversation");
    }
  };

  const updateConversationTitle = async (convId: string, title: string) => {
    try {
      const res = await api.conversations.updateConversationTitle(
        convId,
        title,
      );
      const data = await res.json();

      if (!res.ok) return Promise.reject(data.error);
      return Promise.resolve(data.success);
    } catch (error) {
      return Promise.reject("Failed to update title");
    }
  };
  return {
    getConversation,
    getConversations,
    createConversation,
    updateConversationTitle,
  };
};

export default createConversationService();
