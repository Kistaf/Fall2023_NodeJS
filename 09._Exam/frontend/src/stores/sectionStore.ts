import { writable } from "svelte/store";
import type { PageState } from "../utils/types";
import { navigate } from "svelte-navigator";

function createPageState() {
  const { subscribe, set } = writable<PageState>("/conversations");

  return {
    subscribe,
    setPage: (page: PageState) => set(page),
    setPageAndNavigate: (page: PageState) => {
      navigate(page);
      set(page);
    },
  };
}

export default createPageState();
