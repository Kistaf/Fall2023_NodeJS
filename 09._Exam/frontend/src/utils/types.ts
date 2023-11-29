export type Credentials = {
  email: string;
  password: string;
};

export type AuthState = {
  loggedIn: boolean;
  userId: string | null;
};

export type FriendsStore = {
  sent: FriendFull[];
  received: FriendFull[];
  friends: FriendFull[];
};

export type Message = {
  id: string;
  publisherId: string;
  content: {
    publisherUsername: string;
    publishedAt: Date;
    message: string;
  };
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
  status: "REQUESTED" | "DENIED" | "ACCEPTED";
};

export type FriendFull = Friend & { sender: User; receiver: User };

export type PageState = "conversations" | "friends" | "settings";

export type KeyEvent = KeyboardEvent & {
  currentTarget: EventTarget & HTMLInputElement;
};
