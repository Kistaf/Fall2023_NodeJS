export type AuthService = {
  loginWithGoogle: () => void;
  loginWithCredentials: (data: Credentials) => void;
  registerWithCredentials: (data: Credentials) => void;
  logout: () => void;
};

export type Credentials = {
  email: string;
  password: string;
};

export type AuthState = {
  loggedIn: boolean;
  user: {
    id: string;
    avatarURL: string;
  } | null;
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

export type PageState = "conversations" | "friends" | "settings";

export type KeyEvent = KeyboardEvent & {
  currentTarget: EventTarget & HTMLInputElement;
};
