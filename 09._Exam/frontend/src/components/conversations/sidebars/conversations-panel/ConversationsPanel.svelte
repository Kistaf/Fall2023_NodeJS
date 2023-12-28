<script lang="ts">
  import conversationsStore from "../../../../stores/conversationsStore";
  import Conversation from "./Conversation.svelte";
  import type { Conversation as ConversationType } from "../../../../utils/types";
  import ConversationPopover from "./combobox/ConversationPopover.svelte";

  // TODO: Make a generalized search store
  let filtered: ConversationType[] = [];
  let query: string = "";

  $: filtered = $conversationsStore.conversations.filter((conv) => {
    if (conv.convName.toLowerCase().includes(query.toLowerCase())) {
      return conv.convName;
    }
    return conv.usersToConversation.some((entry) =>
      entry.user.email.toLowerCase().includes(query.toLowerCase()),
    );
  });
</script>

<div
  class="flex flex-col w-[300px] h-screen flex-none px-5 py-5 space-y-6 overflow-y-auto"
>
  <div class="space-y-2">
    <div class="flex flex-row justify-between items-center">
      <h3 class="text-foreground text-xl font-bold">Active chats</h3>
      <ConversationPopover />
    </div>
    <input
      bind:value={query}
      class="w-full bg-input rounded-md border border-border px-3 py-2 text-sm focus:outline-none text-foreground"
      placeholder="Search active conversations..."
    />
  </div>
  <div class="flex flex-col space-y-4">
    {#if query.length === 0}
      {#each $conversationsStore.conversations as conversation}
        <Conversation {conversation} />
      {/each}
    {:else}
      {#each filtered as conversation}
        <Conversation {conversation} />
      {/each}
    {/if}
  </div>
</div>
