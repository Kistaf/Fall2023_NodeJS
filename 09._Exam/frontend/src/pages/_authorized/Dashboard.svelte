<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import type {
    Conversation,
    FriendsStore,
    PageState,
  } from "../../utils/types";
  import sectionStore from "../../stores/sectionStore";
  import Conversations from "../../components/conversations/Conversations.svelte";
  import Friends from "../../components/friends/Friends.svelte";
  import NotFound from "../../components/notFound/NotFound.svelte";
  import { onMount } from "svelte";
  import friendService from "../../services/friendService";
  import friendsStore from "../../stores/friendsStore";
  import { socket } from "../../lib/sockets/sockets";
  import conversationService from "../../services/conversationService";
  import conversationsStore from "../../stores/conversationsStore";

  const location = useLocation();

  onMount(async () => {
    socket.connect();
    const friends: FriendsStore = await friendService.getFriends();
    friendsStore.setFriends(friends);

    const conversations: Conversation[] =
      await conversationService.getConversations();
    conversationsStore.setConversations(conversations);
  });

  $: {
    const pathname = $location.pathname.split("/").slice(1);
    const page = $location.pathname as PageState;

    if (pathname.includes("conversations")) {
      if (pathname.length === 2) {
        const curr = $conversationsStore.selectedConversation ?? null;
        conversationsStore.setSelectedConversation(curr);
        curr
          ? sectionStore.setPageAndNavigate(
              `/dashboard/conversations/${curr.id}`,
            )
          : sectionStore.setPage("/dashboard/conversations");
      } else if (pathname.length > 2) {
        conversationsStore.setSelectedConversationById(pathname[2]);
        $conversationsStore.selectedConversation
          ? sectionStore.setPage(
              `/dashboard/conversations/${$conversationsStore.selectedConversation.id}`,
            )
          : sectionStore.setPage("/dashboard/conversations");
      }
    } else {
      sectionStore.setPage(page);
    }
  }
</script>

{#if $sectionStore.includes("/dashboard/conversations")}
  <Conversations />
{:else if $sectionStore === "/dashboard/friends"}
  <Friends />
{:else if $sectionStore === "/dashboard/404"}
  <NotFound />
{/if}
