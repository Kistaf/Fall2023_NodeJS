import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import type { Credentials } from "../utils/types";
import user from "../stores/authStore";
import { navigate } from "svelte-navigator";
import api from "../utils/api";
import { socket } from "../lib/sockets/sockets";

export type AuthService = {
  loginWithGoogle: () => void;
  loginWithCredentials: (data: Credentials) => Promise<string>;
  registerWithCredentials: (data: Credentials) => Promise<string>;
  logout: () => void;
};

const createAuthService = (): AuthService => {
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        return result.user.getIdToken().then(async (idToken) => {
          const response = await api.auth.fetchSessionLogin(idToken);
          if (response.ok) {
            return navigate("/conversations", {
              replace: true,
            });
          }
        });
      })
      .catch((error) => {
        // display toast
        console.log(error);
      });
  };
  const loginWithCredentials = async (data: Credentials) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      if (!result) return Promise.reject("Failed to signin");

      const idToken = await result.user.getIdToken();
      const res = await api.auth.fetchSessionLogin(idToken);
      if (!res.ok) return Promise.reject("Failed to signin");

      navigate("/conversations", {
        replace: true,
      });

      return Promise.resolve("Successfully signed in");
    } catch (error) {
      return Promise.reject("Failed to signin");
    }
  };

  const registerWithCredentials = async (
    data: Credentials,
  ): Promise<string> => {
    try {
      const res = await api.auth.signInCredentials(data);
      if (!res.ok) return Promise.reject("Failed to signup");
      await loginWithCredentials(data);
      return Promise.resolve("User created");
    } catch (error) {
      return Promise.reject("Something went wrong");
    }
  };

  const logout = () => {
    signOut(auth)
      .then(async () => {
        socket.disconnect();
        const response = await api.auth.fetchSessionLogout();
        if (response.ok) {
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        // display toast
        socket.connect();
        console.log(error);
      });
  };

  return {
    loginWithGoogle,
    loginWithCredentials,
    registerWithCredentials,
    logout,
  };
};

export default createAuthService();
