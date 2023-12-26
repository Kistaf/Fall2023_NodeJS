export type Credentials = {
  email: string;
  password: string;
};

export type AuthStore = {
  loggedIn: boolean;
  userId: string | null;
};

export type FriendsStore = {
  sent: FriendFull[];
  received: FriendFull[];
  friends: FriendFull[];
};

export type ConversationsStore = {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
};

export type Conversation = {
  id: string;
  messages: Message[];
  creator: User;
  convName: string;
  usersToConversation: UsersToConversation[];
};

export type UsersToConversation = {
  user: User;
};

export type Message = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: User;
  content: string;
  conversationId: string;
};

export type User = {
  id: string;
  email: string;
};

export type Friend = {
  id: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: "REQUESTED" | "ACCEPTED";
};

export type FriendFull = Friend & { sender: User; receiver: User };

export type PageState = "conversations" | "friends" | "settings";

export type KeyEventInput = KeyboardEvent & {
  currentTarget: EventTarget & HTMLInputElement;
};

export type KeyEventDiv = KeyboardEvent & {
  currentTarget: EventTarget & HTMLDivElement;
};
