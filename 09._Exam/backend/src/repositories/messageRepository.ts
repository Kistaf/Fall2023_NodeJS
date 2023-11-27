import { ChatMessagePayload } from "../types/payload.ts";

type MessageRepository = {
  saveMessage: (data: ChatMessagePayload) => Promise<boolean>;
  messagesByChatIdWithUser: (
    chatId: string,
    userId: string
  ) => Promise<[] | null>;
};

const createMessageRepository = (): MessageRepository => {
  const saveMessage = async (data: ChatMessagePayload): Promise<boolean> => {
    // update Redis

    // update Database

    return true;
  };

  const messagesByChatIdWithUser = async (
    chatId: string,
    userId: string
  ): Promise<[] | null> => {
    // https://github.com/drizzle-team/drizzle-orm/discussions/1152

    // const conversation = await drizzleDb.query.conversations.findFirst({
    //   where: eq(conversations.id, chatId),
    //   with: {
    //     users: true,
    //     messages: true,
    //   },
    // });

    // if (conversation.users.filter((user) => user.id === userId).length > 0)
    //   return conversation.messages;

    // return [];

    // const chat = await db.chat.findUnique({
    //   where: {
    //     id: chatId,
    //     users: {
    //       some: {
    //         id: userId,
    //       },
    //     },
    //   },
    //   include: {
    //     messages: true,
    //   },
    // });

    // return chat.messages;
    return [];
  };

  return {
    saveMessage,
    messagesByChatIdWithUser,
  };
};

export default createMessageRepository();
