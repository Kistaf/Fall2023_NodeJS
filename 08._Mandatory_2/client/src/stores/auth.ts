import { writable } from "svelte/store";
import type { AuthState, LoginDetails, SignUpDetails } from "../types/auth";
import { navigate } from "svelte-navigator";
import { login, logout, checkAuth, signup } from "../auth/auth_api";
import { errorToast, successToast } from "../components/ui/Toast";

function createAuth() {
  const { subscribe, update, set } = writable<AuthState>({
    isLoading: false,
    user: null,
  });

  return {
    subscribe,
    signIn: async (data: LoginDetails) => {
      update((state) => ({ ...state, isLoading: true }));
      const res = await login(data);
      if (res.error) {
        update((state) => ({ ...state, isLoading: false }));
        errorToast(res.error);
      } else if (res.success) {
        set({
          user: {
            email: res.email,
          },
          isLoading: false,
        });
        successToast("Successfully logged in!");
        navigate("/private", { replace: true });
      }
    },
    signUp: async (data: SignUpDetails) => {
      update((state) => ({ ...state, isLoading: true }));
      const res = await signup(data);
      if (res.error) {
        update((state) => ({ ...state, isLoading: false }));
        errorToast(res.error);
      } else if (res.success) {
        set({
          user: {
            email: res.email,
          },
          isLoading: false,
        });
        successToast("Successfully signed up! Email has been sent");
        navigate("/login", { replace: true });
      }
    },
    logout: async () => {
      update((state) => ({ ...state, isLoading: true }));
      const res = await logout();
      if (res.error) {
        update((state) => ({ ...state, isLoading: false }));
        errorToast("Failed to log out. Please try again.");
        return;
      }
      set({ isLoading: false, user: null });
    },
    checkAuth: async () => {
      const res = await checkAuth();
      if (res.error) {
        errorToast("Something went wrong. Please try again.");
        throw new Error("Something went wrong.");
      } else if (res.success) {
        update((state) => ({
          ...state,
          user: {
            email: res.user,
          },
        }));
      }
    },
  };
}

export const authService = createAuth();
