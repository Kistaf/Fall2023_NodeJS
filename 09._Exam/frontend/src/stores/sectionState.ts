import { writable } from "svelte/store";
import type { PageState } from "../utils/types";
import { navigate, globalHistory } from "svelte-navigator";

function createPageState() {
  const { subscribe, set } = writable<PageState>("conversations");

  const searchParams = new URLSearchParams(globalHistory.location.search);
  const hasSection = searchParams.has("section");
  const path = globalHistory.location.pathname.split("/")[1];

  if (hasSection) {
    const page: PageState = searchParams.get("section") as PageState;
    set(page);
  } else if (path === "chatting") {
    setURLState("conversations");
  }

  return {
    subscribe,
    setSection: (page: PageState) => {
      set(page);
    },
    setSectionAndURL: (page: PageState) => {
      setURLState(page);
      set(page);
    },
  };
}

const setURLState = (page: PageState) => {
  navigate(`/chatting?section=${page}`);
};

export default createPageState();
