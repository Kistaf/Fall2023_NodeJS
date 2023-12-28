<script lang="ts">
  import { onMount } from "svelte";
  import Messages from "../../components/conversations/chat/messages/Messages.svelte";
  import Messenger from "../../components/conversations/chat/messenger/Messenger.svelte";
  import Topbar from "../../components/conversations/chat/topbar/Topbar.svelte";
  import ConversationsPanel from "../../components/conversations/sidebars/conversations-panel/ConversationsPanel.svelte";
  import conversationsStore from "../../stores/conversationsStore";

  onMount(() => conversationsStore.setSelectedConversationById(id));

  export let id: string;
</script>

<div class="flex flex-row">
  <ConversationsPanel />
  <div
    class="flex-1 h-screen w-full bg-background border-l-[1px] border-r-[1px] border-border"
  >
    <div class="w-full h-screen flex flex-col px-6 py-4">
      {#if $conversationsStore.selectedConversation === null}
        <p class="text-primary font-bold">Invalid conversation ID</p>
      {:else}
        <Topbar />
        <Messages />
        <Messenger />
      {/if}
    </div>
  </div>
</div>
