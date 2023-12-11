<script lang="ts">
  import conversationsStore from "../../../../stores/conversationsStore";
  import Conversation from "./Conversation.svelte";
  import type { Conversation as ConversationType } from "../../../../utils/types";
  import authStore from "../../../../stores/authStore";
  import { extractOtherPartKey } from "../../../../utils/utils";
  import ConversationPopover from "./combobox/ConversationPopover.svelte";

  // TODO: Make a generalized search store
  let filtered: ConversationType[] = [];
  let query: string = "";

  $: filtered = $conversationsStore.conversations.filter((conv) =>
    conv[
      extractOtherPartKey(conv.participantAId, $authStore.userId ?? "")
    ].email
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
</script>

<div class="flex flex-col w-[300px] h-screen flex-none px-5 py-5 space-y-6">
  <div class="space-y-2">
    <div class="flex flex-row justify-between items-center">
      <h3 class="text-white text-xl font-bold">Active chats</h3>
      <ConversationPopover />
    </div>
    <input
      bind:value={query}
      class="w-full bg-message-inputField rounded-md border border-border px-3 py-2 text-sm focus:outline-none text-white"
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
