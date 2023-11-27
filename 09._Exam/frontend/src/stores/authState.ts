import { writable } from "svelte/store";
import type { AuthState } from "../utils/types";

export const user = writable<AuthState>({
  loggedIn: false,
  user: null,
});
