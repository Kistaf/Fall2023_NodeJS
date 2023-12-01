export type Friend = {
  id: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: "REQUESTED" | "ACCEPTED";
};

export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id: string;
  authorId: string;
  conversationId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Conversation = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  participantAId: string;
  participantBId: string;
};

export type UserMessages = User & { messages: Message[] };
export type UserFriends = User & { friends: Friend[] };
export type UserConversations = User & { conversations: Conversation[] };

export type FriendFull = Friend & { sender: User; receiver: User };

export type UserFull = User & {
  conversations: Conversation[];
  messages: Message[];
  friends: Friend[];
};

export type ConversationMessages = Conversation & { messages: Message[] };

export type ConversationFull = Conversation & {
  messages: Message[];
  users: User[];
};
