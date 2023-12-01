import { relations } from "drizzle-orm";
import { pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";

// Entities

export const users = pgTable("users", {
  id: varchar("id", { length: 64 }).primaryKey().notNull(),
  email: varchar("email", { length: 32 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: varchar("id", { length: 64 }).primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  participantAId: varchar("participant_a_id")
    .references(() => users.id)
    .notNull(),
  participantBId: varchar("participant_b_id")
    .references(() => users.id)
    .notNull(),
});

export const friends = pgTable("friends", {
  id: varchar("id", { length: 64 }).primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  senderId: varchar("sender_id")
    .references(() => users.id)
    .notNull(),
  receiverId: varchar("receiver_id")
    .references(() => users.id)
    .notNull(),
  status: text("status", { enum: ["REQUESTED", "ACCEPTED"] }).notNull(),
});

export const messages = pgTable("messages", {
  id: varchar("id", { length: 64 }).primaryKey().notNull(),
  authorId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  conversationId: varchar("conversation_id", { length: 64 })
    .references(() => conversations.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  friends: many(friends),
  messages: many(messages),
  conversations: many(conversations),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  author: one(users, {
    fields: [messages.authorId],
    references: [users.id],
  }),
}));

export const conversationsRelations = relations(
  conversations,
  ({ many, one }) => ({
    messages: many(messages),
    participantA: one(users, {
      fields: [conversations.participantAId],
      references: [users.id],
    }),
    participantB: one(users, {
      fields: [conversations.participantBId],
      references: [users.id],
    }),
  })
);

export const friendsRelations = relations(friends, ({ one }) => ({
  sender: one(users, {
    fields: [friends.senderId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [friends.receiverId],
    references: [users.id],
  }),
}));
