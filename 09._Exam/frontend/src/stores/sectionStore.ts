import { writable } from "svelte/store";
import type { PageState } from "../utils/types";
import { navigate, globalHistory } from "svelte-navigator";
import conversationsStore from "./conversationsStore";
import conversationService from "../services/conversationService";

function createPageState() {
  const { subscribe, set } = writable<PageState>("/dashboard/conversations");

  const path = globalHistory.location.pathname.split("/").slice(1);

  if (path[0] === "dashboard") {
    if (path.length === 1) {
      set("/dashboard/conversations");
      navigate("/dashboard/conversations");
    } else if (path.length > 1) {
      switch (path[1]) {
        case "conversations":
          if (path.length === 3) {
            conversationService
              .getConversation(path[2])
              .then((conversation) => {
                if (!conversation) throw new Error();
                conversationsStore.setSelectedConversation(conversation);
                set(`/dashboard/conversations/${path[2]}`);
              })
              .catch(() => {
                set("/dashboard/conversations");
                navigate("/dashboard/conversations");
              });
            break;
          } else {
            set("/dashboard/conversations");
          }
          break;
        case "friends":
          set("/dashboard/friends");
          break;
        default:
          set("/dashboard/404");
          navigate("/dashboard/404");
          break;
      }
    }
  }
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
