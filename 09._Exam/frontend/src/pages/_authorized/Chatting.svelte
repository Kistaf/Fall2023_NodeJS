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
      sectionStore.setSection(pageSection);
    }
  }
</script>

{#if $sectionStore === "conversations"}
  <Conversations />
{:else if $sectionStore === "friends"}
  <Friends />
{:else if $sectionStore === "settings"}
  <Settings />
{:else}
  <NotFound />
{/if}
