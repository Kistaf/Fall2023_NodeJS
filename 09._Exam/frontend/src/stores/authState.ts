import { writable } from "svelte/store";

export const user = writable<{
  userId: string | null;
  loggedIn: boolean;
}>({
  userId: null,
  loggedIn: false,
});
