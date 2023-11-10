export type LoginDetails = {
  email: string;
  password: string;
};

export type SignUpDetails = {
  email: string;
  password: string;
  secret: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
};

export type User = {
  email: string;
};
