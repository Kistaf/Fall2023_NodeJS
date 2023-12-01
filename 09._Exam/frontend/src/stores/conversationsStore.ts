import { writable } from "svelte/store";
import type { Conversation, ConversationsStore, Message } from "../utils/types";

const createConversationsStore = () => {
  const { subscribe, update } = writable<ConversationsStore>({
    conversations: [],
    selectedConversation: null,
  });

  return {
    subscribe,
    setConversations: (conversations: Conversation[]) =>
      update((prev) => {
        return {
          ...prev,
          conversations,
        };
      }),
    addConversation: (conversation: Conversation) =>
      update((prev) => {
        return {
          ...prev,
          conversations: [...prev.conversations, conversation],
        };
      }),
    addMessage: (message: Message) => {
      update((prev) => {
        const idx = prev.conversations.findIndex(
          (conv) => conv.id === message.conversationId,
        );

        const convs = prev.conversations;
        convs[idx].messages.push(message);

        return {
          ...prev,
          conversations: [...convs],
        };
      });
    },
    setSelectedConversation: (conversation: Conversation) =>
      update((prev) => {
        return {
          ...prev,
          selectedConversation: conversation,
        };
      }),
  };
};

export default createConversationsStore();
