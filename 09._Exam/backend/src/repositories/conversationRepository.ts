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
            convName: true,
          },
          with: {
            messages: {
              with: {
                author: {
                  columns: {
                    id: true,
                    email: true,
                    avatarURL: true,
                  },
                },
              },
            },
            creator: {
              columns: {
                id: true,
                email: true,
                avatarURL: true,
              },
            },
            usersToConversation: {
              columns: {},
              with: {
                user: {
                  columns: {
                    id: true,
                    email: true,
                    avatarURL: true,
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
        convName: true,
      },
      with: {
        messages: {
          with: {
            author: {
              columns: {
                id: true,
                email: true,
                avatarURL: true,
              },
            },
          },
        },
        creator: {
          columns: {
            id: true,
            email: true,
            avatarURL: true,
          },
        },
        usersToConversation: {
          with: {
            user: {
              columns: {
                id: true,
                email: true,
                avatarURL: true,
              },
            },
          },
        },
      },
    });
    return conv;
  };

  const editConvName = async (convId: string, convName: string) => {
    const conversation = await db
      .update(conversations)
      .set({
        convName: convName ?? "",
      })
      .where(eq(conversations.id, convId))
      .returning();
    return conversation[0];
  };

  const createConversation = async (userIds: string[], creatorId: string) => {
    const conversation = await db
      .insert(conversations)
      .values({
        id: nanoid(),
        creatorId,
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
    editConvName,
  };
};

export default createConversationRepository();
