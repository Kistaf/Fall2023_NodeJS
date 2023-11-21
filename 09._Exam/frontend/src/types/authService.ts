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
