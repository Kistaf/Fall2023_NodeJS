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
});

export const friends = pgTable("friends", {
  id: varchar("id", { length: 64 }).primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  senderId: varchar("sender_id").references(() => users.id),
  receiverId: varchar("receiver_id").references(() => users.id),
  status: text("status", { enum: ["REQUESTED", "ACCEPTED"] }),
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

export const conversationsRelations = relations(conversations, ({ many }) => ({
  messages: many(messages),
  users: many(users),
}));

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
