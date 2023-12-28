<script lang="ts">
  import { useLocation, useFocus, navigate } from "svelte-navigator";
  import { onMount, type ComponentType } from "svelte";
  import user from "../stores/authStore";
  import api from "../utils/api";
  import NavSidebar from "../components/general/Sidebar.svelte";
  import friendService from "../services/friendService";
  import type { Conversation, FriendsStore } from "../utils/types";
  import friendsStore from "../stores/friendsStore";
  import conversationService from "../services/conversationService";
  import conversationsStore from "../stores/conversationsStore";
  import { socket } from "../lib/sockets/sockets";

  let isChecking = true;
  const location = useLocation();
  const registerFocus = useFocus();

  // TODO: Move logic out of component

  const navigateToLogin = () => {
    navigate("/", {
      state: {
        from: $location.pathname,
      },
      replace: true,
    });
  };

  onMount(async () => {
    try {
      const response = await api.auth.fetchCheckSession();
      if (!response.ok) {
        throw new Error("UnAuthorized");
      }
      const data = await response.json();
      user.setUser({
        loggedIn: true,
        userId: data.userId,
      });

      socket.connect();

      const friends: FriendsStore = await friendService.getFriends();
      friendsStore.setFriends(friends);

      const conversations: Conversation[] =
        await conversationService.getConversations();
      conversationsStore.setConversations(conversations);
    } catch {
      navigateToLogin();
    } finally {
      isChecking = false;
    }
  });

  $: if (!isChecking && !$user.loggedIn) {
    navigateToLogin();
  }

  export let loading: ComponentType;
</script>

{#if !isChecking && $user.loggedIn}
  <div class="bg-background w-screen h-screen flex flex-row">
    <NavSidebar />
    <div class="flex-1">
      <slot {registerFocus} />
    </div>
  </div>
{/if}

{#if isChecking}
  <div class="bg-background w-screen h-screen flex flex-row">
    <NavSidebar />
    <svelte:component this={loading} />
  </div>
{/if}
