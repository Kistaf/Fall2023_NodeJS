import { writable } from "svelte/store";
import type { AuthStore } from "../utils/types";

function createAuthStore() {
  const { subscribe, set } = writable<AuthStore>({
    loggedIn: false,
    userId: null,
  });

  return {
    subscribe,
    setUser: (state: AuthStore) => set(state),
  };
}

export default createAuthStore();
