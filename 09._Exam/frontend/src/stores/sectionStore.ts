import { writable } from "svelte/store";
import type { PageState } from "../utils/types";
import { globalHistory } from "svelte-navigator";

function createPageState() {
  const { subscribe, set } = writable<PageState>("/conversations");
  const path = globalHistory.location.pathname.split("/").slice(1);

  if (path[0] === "conversations") {
    set("/conversations");
  } else if (path[0] === "friends") {
    set("/friends");
  }

  return {
    subscribe,
    setPage: (page: PageState) => set(page),
  };
}

export default createPageState();
