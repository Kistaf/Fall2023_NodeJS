import { eq } from "drizzle-orm";
import { db } from "../lib/drizzle/db.ts";
import { conversations, usersToConversation } from "../lib/drizzle/schema.ts";
import { nanoid } from "nanoid";

const createConversationRepository = () => {
  const getConversationsByUserId = async (userId: string) => {
    const queriedConversations = await db.query.usersToConversation.findMany({
      where: eq(usersToConversation.userId, userId),
      columns: {},
      with: {
        conversation: {
          columns: {
            id: true,
          },
          with: {
            messages: {
              with: {
                author: {
                  columns: {
                    id: true,
                    email: true,
                  },
                },
              },
            },
            usersToConversation: {
              columns: {},
              with: {
                user: {
                  columns: {
                    id: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const convs = queriedConversations.map((entry) => entry.conversation);
    return convs;
  };

  const getConversationByConvId = async (convId: string) => {
    const conv = await db.query.conversations.findFirst({
      where: eq(conversations.id, convId),
      columns: {
        id: true,
      },
      with: {
        messages: {
          with: {
            author: {
              columns: {
                id: true,
                email: true,
              },
            },
          },
        },
        usersToConversation: {
          with: {
            user: {
              columns: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
    return conv;
  };

  const createConversation = async (userIds: string[]) => {
    const conversation = await db
      .insert(conversations)
      .values({
        id: nanoid(),
      })
      .returning();

    userIds.forEach(async (userId) => {
      await db.insert(usersToConversation).values({
        convId: conversation[0].id,
        userId,
      });
    });

    return conversation[0].id;
  };

  return {
    getConversationsByUserId,
    getConversationByConvId,
    createConversation,
  };
};

export default createConversationRepository();
