import { get } from "svelte/store";
import api from "../utils/api";
import conversationsStore from "../stores/conversationsStore";
import toast from "svelte-french-toast";

const createMessageService = () => {
  const sendMessage = async (message: string) => {
    const convId = get(conversationsStore).selectedConversation?.id ?? "";
    const res = await api.messages.sendMessage(message, convId);
    if (!res.ok) {
      return toast.error("Something went wrong trying to send the message");
    }
  };

  return {
    sendMessage,
  };
};

export default createMessageService();
