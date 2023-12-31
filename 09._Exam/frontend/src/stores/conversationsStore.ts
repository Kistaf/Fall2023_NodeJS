import { writable } from "svelte/store";
import type { Conversation, ConversationsStore, Message } from "../utils/types";

const createConversationsStore = () => {
  const { subscribe, update, set } = writable<ConversationsStore>({
    conversations: [],
    selectedConversation: null,
  });

  return {
    subscribe,
    set,
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
    deleteMessage: (message: Message) => {
      update((prev) => {
        const idx = prev.conversations.findIndex(
          (conv) => conv.id === message.conversationId,
        );

        const convs = prev.conversations;
        convs[idx].messages = convs[idx].messages.filter(
          (msg) => msg.id !== message.id,
        );

        return {
          ...prev,
          conversations: [...convs],
        };
      });
    },
    setSelectedConversation: (conversation: Conversation | null) =>
      update((prev) => {
        return {
          ...prev,
          selectedConversation: conversation,
        };
      }),
    setSelectedConversationById: (convId: string) => {
      update((prev) => {
        const conv = prev.conversations.find((c) => c.id === convId);
        return {
          ...prev,
          selectedConversation: conv ?? null,
        };
      });
    },
    updateTitle: (convId: string, title: string) =>
      update((prev) => {
        const idx = prev.conversations.findIndex((conv) => conv.id === convId);

        const convs = prev.conversations;
        convs[idx].convName = title;

        return {
          ...prev,
          conversations: [...convs],
        };
      }),
  };
};

export default createConversationsStore();
