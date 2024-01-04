import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";

// Entities

export const users = pgTable("users", {
  id: varchar("id", { length: 64 }).primaryKey().notNull(),
  email: varchar("email", { length: 32 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  avatarURL: varchar("avatar_url").notNull(),
});

export const conversations = pgTable("conversations", {
  id: varchar("id", { length: 64 }).primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  creatorId: varchar("creator_id", { length: 64 })
    .references(() => users.id)
    .notNull(),
  convName: varchar("conv_name", { length: 64 }),
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

export const usersToConversation = pgTable(
  "user_conversation",
  {
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id),
    convId: varchar("conv_id")
      .notNull()
      .references(() => conversations.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.convId, t.userId] }),
  })
);

// Relations

export const usersToConversationRelations = relations(
  usersToConversation,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToConversation.userId],
      references: [users.id],
    }),
    conversation: one(conversations, {
      fields: [usersToConversation.convId],
      references: [conversations.id],
    }),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  friends: many(friends),
  messages: many(messages),
  createdConversations: many(conversations),
  usersToConversation: many(usersToConversation),
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
    usersToConversation: many(usersToConversation),
    creator: one(users, {
      fields: [conversations.creatorId],
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
