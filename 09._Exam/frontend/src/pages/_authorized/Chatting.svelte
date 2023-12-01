<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import type {
    Conversation,
    FriendsStore,
    PageState,
  } from "../../utils/types";
  import sectionState from "../../stores/sectionState";
  import Conversations from "../../components/conversations/Conversations.svelte";
  import Friends from "../../components/friends/Friends.svelte";
  import Settings from "../../components/settings/Settings.svelte";
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
    const searchParams = new URLSearchParams($location.search);
    const pathname = $location.pathname.split("/")[1];
    if (searchParams.has("section") && pathname === "chatting") {
      const pageSection = searchParams.get("section") as PageState;
      sectionState.setSection(pageSection);
    }
  }
</script>

{#if $sectionState === "conversations"}
  <Conversations />
{:else if $sectionState === "friends"}
  <Friends />
{:else if $sectionState === "settings"}
  <Settings />
{:else}
  <NotFound />
{/if}
