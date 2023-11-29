import { writable } from "svelte/store";
import type { AuthState } from "../utils/types";

function createAuthState() {
  const { subscribe, set } = writable<AuthState>({
    loggedIn: false,
    userId: null,
  });

  return {
    subscribe,
    setUser: (state: AuthState) => set(state),
  };
}

export default createAuthState();
