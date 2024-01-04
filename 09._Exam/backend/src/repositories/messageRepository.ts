import { messages } from "../lib/drizzle/schema.ts";
import { db } from "../lib/drizzle/db.ts";
import { nanoid } from "nanoid";
import { desc, eq } from "drizzle-orm";

const createMessageRepository = () => {
  const saveMessage = async (
    userId: string,
    message: string,
    convId: string
  ) => {
    const createdMessage = await db
      .insert(messages)
      .values({
        id: nanoid(),
        authorId: userId,
        content: message,
        conversationId: convId,
      })
      .returning();
    return createdMessage[0].id;
  };

  const getMessageById = async (id: string) => {
    const message = await db.query.messages.findFirst({
      where: eq(messages.id, id),
      with: {
        author: {
          columns: {
            id: true,
            email: true,
            avatarURL: true,
          },
        },
      },
      orderBy: desc(messages.createdAt),
    });
    return message;
  };

  const deleteMessage = async (id: string) => {
    const deletedMessage = await db
      .delete(messages)
      .where(eq(messages.id, id))
      .returning();

    return deletedMessage[0];
  };

  return {
    saveMessage,
    getMessageById,
    deleteMessage,
  };
};

export default createMessageRepository();
