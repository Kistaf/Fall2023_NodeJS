import { and, eq, or } from "drizzle-orm";
import { db } from "../lib/drizzle/db.ts";
import { conversations } from "../lib/drizzle/schema.ts";
import { nanoid } from "nanoid";

const createConversationRepository = () => {
  const getConversationsByUserId = async (userId: string) => {
    const convs = await db.query.conversations.findMany({
      where: or(
        eq(conversations.participantAId, userId),
        eq(conversations.participantBId, userId)
      ),
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
        participantA: {
          columns: {
            id: true,
            email: true,
          },
        },
        participantB: {
          columns: {
            id: true,
            email: true,
          },
        },
      },
    });
    return convs;
  };

  const getConversationByConvId = async (convId: string) => {
    const conversation = await db.query.conversations.findFirst({
      where: eq(conversations.id, convId),
      with: {
        messages: true,
        participantA: {
          columns: {
            id: true,
            email: true,
          },
        },
        participantB: {
          columns: {
            id: true,
            email: true,
          },
        },
      },
    });
    return conversation;
  };

  const hasConversation = async (particpantA: string, participantB: string) => {
    const conversation = await db.query.conversations.findFirst({
      where: or(
        and(
          eq(conversations.participantAId, particpantA),
          eq(conversations.participantBId, participantB)
        ),
        and(
          eq(conversations.participantAId, participantB),
          eq(conversations.participantBId, particpantA)
        )
      ),
    });
    if (!conversation) return false;
    return true;
  };

  const createConversation = async (
    participantA: string,
    participantB: string
  ) => {
    const conversation = await db
      .insert(conversations)
      .values({
        id: nanoid(),
        participantAId: participantA,
        participantBId: participantB,
      })
      .returning();
    return conversation[0].id;
  };

  const deleteConversation = async (convId: string) => {
    try {
      const deletedConv = await db
        .delete(conversations)
        .where(eq(conversations.id, convId))
        .returning();
      return deletedConv[0];
    } catch (error) {
      return undefined;
    }
  };
  return {
    getConversationsByUserId,
    getConversationByConvId,
    createConversation,
    hasConversation,
    deleteConversation,
  };
};

export default createConversationRepository();
