<script lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from "@rgossiaux/svelte-headlessui";
  import { PenSquare } from "lucide-svelte";
  import { extractFriendKey } from "../../../../../utils/utils";
  import friendsStore from "../../../../../stores/friendsStore";
  import Button from "../../../../general/Button.svelte";
  import authStore from "../../../../../stores/authStore";
  import toast from "svelte-french-toast";
  import conversationService from "../../../../../services/conversationService";
  import type { FriendFull } from "../../../../../utils/types";
  import FriendOption from "./FriendOption.svelte";

  const handleSelectFriend = (friendId: string) => {
    if (selectedForConversation.includes(friendId)) {
      selectedForConversation = selectedForConversation.filter(
        (id) => id !== friendId,
      );
    } else {
      selectedForConversation = [...selectedForConversation, friendId];
    }
  };

  const handleCreateConversation = (callback: () => void) => {
    toast
      .promise(
        conversationService.createConversation(selectedForConversation),
        {
          loading: "Creating conversation...",
          success: (success) => success,
          error: (error) => error,
        },
      )
      .finally(() => {
        selectedForConversation = [];
        callback();
      });
  };

  const setComboboxSearchFocus = () =>
    setTimeout(() => document.getElementById("friends-search")?.focus(), 50);

  // TODO: Make a generalized search store
  let filtered: FriendFull[] = [];
  let query: string = "";

  $: filtered = $friendsStore.friends.filter((f) =>
    f[extractFriendKey(f.senderId, $authStore.userId ?? "")].email
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  let selectedForConversation: string[] = [];
</script>

<Popover class="relative">
  <PopoverButton on:click={setComboboxSearchFocus}>
    <PenSquare size={19} class="cursor-pointer text-primary" />
  </PopoverButton>
  <PopoverPanel
    let:close
    class="absolute z-10 w-[200px] h-auto max-h-[200px] bg-popover border rounded-md border-border right-0 flex flex-col"
  >
    <div class="w-full border-b border-border">
      <input
        bind:value={query}
        id="friends-search"
        placeholder="Search friends..."
        class="w-full bg-popover rounded-tl-md rounded-tr-md border-b-1 border-border px-3 py-2 text-sm text-popover-foreground focus:outline-none"
      />
    </div>
    <div class="flex flex-col text-message-username overflow-y-auto">
      {#if query.length === 0}
        {#each $friendsStore.friends as friendship}
          <FriendOption
            {handleSelectFriend}
            {friendship}
            {selectedForConversation}
          />
        {/each}
      {:else}
        {#if filtered.length === 0}
          <div class="text-sm px-3 py-3 text-popover-foreground">
            No friends found
          </div>
        {/if}
        {#each filtered as friendship}
          <FriendOption
            {handleSelectFriend}
            {friendship}
            {selectedForConversation}
          />
        {/each}
      {/if}
    </div>
    <Button
      disabled={selectedForConversation.length === 0}
      class={`bg-primary text-primary-foreground rounded-br-md rounded-bl-md rounded-t-none text-sm ${
        selectedForConversation.length === 0 ? "cursor-not-allowed" : null
      }`}
      on:click={() => handleCreateConversation(() => close(null))}
    >
      Create conversation
    </Button>
  </PopoverPanel>
</Popover>
